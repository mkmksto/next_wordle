import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface IGameSettings {
    num_chars: number
    difficulty: string
}

interface GameSettingsStore {
    gameSettings$: { num_chars: number; difficulty: string }
    changeNumChars$: (newSize: number) => void
    changeDifficulty$: (newDiff: string) => void
    resetGameSettings$: () => void
}

const gameSettings = (set: any) => ({
    gameSettings$: { num_chars: 5, difficulty: 'medium' },

    changeNumChars$: (newSize: number) =>
        set((state: GameSettingsStore) => {
            state.gameSettings$.num_chars = newSize
        }),

    changeDifficulty$: (newDiff: string) =>
        set((state: GameSettingsStore) => {
            state.gameSettings$.difficulty = newDiff
        }),

    resetGameSettings$: () =>
        set((state: GameSettingsStore) => {
            state.gameSettings$ = { num_chars: 5, difficulty: 'medium' }
        }),
})

const useGameSettings$ = create<GameSettingsStore>()(immer(gameSettings))

export default useGameSettings$
