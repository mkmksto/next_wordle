import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
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
    currentRow$: LetterGuess[]
    addLetterToGuess$: (letterToAdd: string) => void
    removeLastLetterFromGuess$: () => void
    incrementRow$: () => void
}

// referencing state variables inside state functions: https://github.com/TePMo-Tapo4eK/Tic-Tac-Toe/blob/main/src/store/index.tsx
// settings stores before returning: https://github.com/nexxeln/nexdle/blob/main/src/store.ts
// computed properties: https://github.com/pmndrs/zustand/issues/132#issuecomment-669619250
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

    currentRow$: () => get().allGuesses$[get().currentRowIdx$],

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
})

const useGuessStore = create<IGuessStore>()(middleware(guessStore))
export default useGuessStore

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
