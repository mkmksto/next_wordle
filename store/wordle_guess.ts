import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

interface IGuessState {
    id: string
    letter: string
    isBlank: boolean
    isLetterInWord: boolean
    isLetterInCorrectPosition: boolean
}

const guessStore = (set: any) => ({
    // dsadas
})
