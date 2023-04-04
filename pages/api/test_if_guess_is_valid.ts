import type { NextApiRequest, NextApiResponse } from 'next'
import { diff_to_freq_map, IValidDifficultyValues } from './get_random_word'
import EnglishDictSingleton from '@/services/english_dictionary'

interface Data {
    validity: boolean
}

interface FrontendPayload {
    word_to_test: string
    cur_word_difficulty: IValidDifficultyValues
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== 'POST') {
        return res.status(400).end()
        // throw new Error('should be a post request')
    }

    const EngDict = await EnglishDictSingleton

    const { word_to_test, cur_word_difficulty }: FrontendPayload = req.body
    console.log('-----------testing validity of current guess: ', word_to_test)

    const cur_word_frequency = diff_to_freq_map[cur_word_difficulty]
    const guess_frequency = await EngDict.get_word_frequency(word_to_test)
    console.log('------- frequency of guess: ', guess_frequency)
    console.log('current set difficulty: ', cur_word_difficulty, ' :', cur_word_frequency)

    if (!word_to_test) return res.status(200).json({ validity: false })
    if (!guess_frequency) return res.status(200).json({ validity: false })
    if (guess_frequency >= cur_word_frequency) return res.status(200).json({ validity: true })

    res.status(200).json({ validity: false })
}
