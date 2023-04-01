import EnglishDictSingleton from '@/services/english_dictionary'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
    random_word: {}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const word = (await EnglishDictSingleton).get_random_word()

    res.status(200).json({ random_word: word })
}
