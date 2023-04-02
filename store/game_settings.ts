import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface IGameSettings {
    num_chars: number
    difficulty: string
}

interface GameSettingsStore {
    gameSettings$: { num_chars: number; difficulty: string }
    changeNumChars$: (newSize: number) => void
    resetGameSettings$: () => void
}

const middleware = (f: (set: any, get: any) => void) => immer(devtools(f))

const gameSettings = (set: any, get: any) => ({
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

const useGameSettings$ = create<GameSettingsStore>()(middleware(gameSettings))

export default useGameSettings$
