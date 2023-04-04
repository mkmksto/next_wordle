import { allowed_guesses } from '@/data/allowed_guesses'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import middleware from './zustand_middleware'

export interface LetterGuess {
    id: string
    letter: string
    isBlank: boolean
    isLetterInWord: boolean
    isLetterInCorrectPosition: boolean
}

interface IGuessStore {
    currentRandomWord$: string
    setCurrentRandomWord$: (curWord: string) => void
    allGuesses$: LetterGuess[][]
    currentRowIdx$: number
    incrementRow$: () => void
    currentRow$: () => LetterGuess[]
    currentFlattenedGuess$: () => string
    addLetterToGuess$: (letterToAdd: string) => void
    removeLastLetterFromGuess$: () => void
    isCurrentRowFilled$: () => boolean
    isGuessValid$(): () => Promise<boolean>
    isGuessCorrect$: () => boolean
}

const guessStore = (set: any, get: any) => ({
    currentRandomWord$: '',

    setCurrentRandomWord$: (curWord: string) => {
        set((state: IGuessStore) => {
            state.currentRandomWord$ = curWord
        })
    },

    allGuesses$: generateEmptyGuessArray(5),

    currentRowIdx$: 0,

    incrementRow$: () =>
        set((state: IGuessStore) => {
            state.currentRowIdx$++
        }),

    // get currentRow$() {
    //     return get().allGuesses$[get().currentRowIdx$]
    // },
    currentRow$: (): LetterGuess[] => get().allGuesses$[get().currentRowIdx$],

    currentFlattenedGuess$: (): string =>
        get()
            .currentRow$()
            .filter((l: LetterGuess) => !l.isBlank)
            .map((l: LetterGuess) => l.letter)
            .reduce((acc: string, l: LetterGuess) => acc + l, ''),

    addLetterToGuess$: (letterToAdd: string) => {
        const current = (): LetterGuess[] => get().currentRow$()
        const currentRow: LetterGuess[] = JSON.parse(JSON.stringify(current()))
        const nextBlankCell = currentRow.find((letter) => letter.isBlank) as LetterGuess

        if (!nextBlankCell) return
        nextBlankCell.letter = letterToAdd
        nextBlankCell.isBlank = false

        set((state: IGuessStore) => {
            const newState: LetterGuess[][] = JSON.parse(JSON.stringify(state.allGuesses$))
            newState.splice(state.currentRowIdx$, 1, currentRow)
            state.allGuesses$ = newState
        })
    },

    removeLastLetterFromGuess$: () => {
        const current = (): LetterGuess[] => get().currentRow$()
        const currentRow: LetterGuess[] = JSON.parse(JSON.stringify(current()))
        const itemToRemove = [...currentRow]
            .reverse()
            .find((letter) => !letter.isBlank) as LetterGuess
        if (!itemToRemove) return
        itemToRemove.letter = ''
        itemToRemove.isBlank = true
        itemToRemove.isLetterInWord = false
        itemToRemove.isLetterInCorrectPosition = false

        set((state: IGuessStore) => {
            const newState: LetterGuess[][] = JSON.parse(JSON.stringify(state.allGuesses$))
            newState.splice(state.currentRowIdx$, 1, currentRow)
            state.allGuesses$ = newState
        })
    },

    isCurrentRowFilled$: () =>
        get().currentRandomWord$.length === get().currentFlattenedGuess$().length,

    async isGuessValid$() {
        if (allowed_guesses.includes(get().currentFlattenedGuess$())) return true
        // TODO: implement validating guess from backend API call
        return false
    },

    isAllRowsFilled$() {
        //
    },

    isGuessCorrect$() {
        if (get().currentRandomWord$ === get().currentFlattenedGuess$()) return true
        return false
    },
})

const useGuessTracker$ = create<IGuessStore>()(immer(guessStore))
export default useGuessTracker$

function generateEmptyGuessArray(wordSize: number): LetterGuess[][] {
    const finalArr: LetterGuess[][] = []
    for (let i = 0; i < 6; i++) {
        const nestedArr: LetterGuess[] = []
        for (let i = 0; i < wordSize; i++) {
            nestedArr.push({
                id: uuidv4(),
                letter: '',
                isBlank: true,
                isLetterInWord: false,
                isLetterInCorrectPosition: false,
            })
        }
        finalArr.push(nestedArr)
    }
    return finalArr
}
