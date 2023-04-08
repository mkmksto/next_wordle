import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface IRandomWordState {
    currentRandomWord$: string
    // renewCurrentWord$: (gameSettings: IGameSettings) => Promise<void>
    setCurrentWord$: (word: string) => void
    clearCurRandomWord$: () => void
}

// interface IBackendRandWordResponse {
//     random_word: string
// }

const wordStore = (set: any) => ({
    currentRandomWord$: '',

    setCurrentWord$: (word: string) =>
        set((state: IRandomWordState) => {
            state.currentRandomWord$ = word
        }),

    clearCurRandomWord$: () => set((state: IRandomWordState) => (state.currentRandomWord$ = '')),
})

const useRandomWordStore$ = create<IRandomWordState>()(immer(wordStore))

export default useRandomWordStore$
