import {
    get_all_dictfiles_paths,
    get_consolidated_dict_data,
    get_dictfiles_path,
} from './file_utils'
import my_fetch from './my_fetch'
import { get_random_item } from '@/services/misc_utils'

class EnglishDict {
    data: {}
    words: string[]

    constructor(data: {}) {
        this.data = data
        this.words = Object.keys(this.data)
    }

    get_random_word(): string {
        return get_random_item<string>(this.words)
    }

    async get_word_frequency(word: string): Promise<number> {
        const [res, error] = await my_fetch(
            `https://api.datamuse.com/words?${new URLSearchParams({
                sp: word,
                qe: 'sp',
                md: 'fr',
                max: '1',
            })}`,
        )
        if (error) return 0
        let freq = res[0]
        freq = freq['tags']
        freq = freq.at(-1)
        freq = parseFloat(freq.split(':').at(-1))
        return freq
    }
}

async function EnglishDictSingleton() {
    const dict_root_path = get_dictfiles_path()
    const all_file_paths = await get_all_dictfiles_paths(dict_root_path)
    const consolidated_dict_data = await get_consolidated_dict_data(all_file_paths)

    return new EnglishDict(consolidated_dict_data)
}

// (cahced singleton) https://medium.com/swlh/node-js-and-singleton-pattern-7b08d11c726a
export default EnglishDictSingleton()
