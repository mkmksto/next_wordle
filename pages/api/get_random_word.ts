import EnglishDictSingleton from '@/services/english_dictionary'
import { IGameSettings } from '@/store/game_settings'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
    random_word: {}
}

// index signature
const diff_to_freq_map: { [key: string]: number } = {
    easy: 5,
    medium: 0.1,
    hard: 0.01,
    very_hard: 0.001,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== 'POST') {
        res.status(400)
        throw new Error('should be a post request')
    }
    const { num_chars, difficulty }: IGameSettings = req.body
    const diff = diff_to_freq_map[difficulty]

    let random_word: string
    let frequency: number

    const EngDict = await EnglishDictSingleton
    while (true) {
        console.log('---- fetching random word ----')
        random_word = EngDict.get_random_word()
        frequency = await EngDict.get_word_frequency(random_word)
        if (
            random_word.length === num_chars &&
            frequency >= diff &&
            /^[a-zA-Z]*?$/.test(random_word)
        ) {
            console.log(`***** THE FINAL WORD: ${random_word} with a freq of ${frequency}`)
            res.status(200).json({ random_word: random_word })
            return
        }
    }
}
