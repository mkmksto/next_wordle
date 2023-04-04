import { create } from 'zustand'
// import { immer } from 'zustand/middleware/immer'
import middleware from './zustand_middleware'

interface IGameState {
    hasWon$: boolean
    hasLost$: boolean
    allowInput$: boolean
    setAllowInput$: (bool: boolean) => void
    setWonState$: (bool: boolean) => void
    resetGameStates$: () => void
}

const gameState = (set: any) => ({
    hasWon$: false,
    hasLost$: false,
    allowInput$: true,

    setAllowInput$: (bool: boolean) =>
        set((state: IGameState) => {
            state.allowInput$ = bool
        }),

    setWonState$: (bool: boolean) =>
        set((state: IGameState) => {
            state.hasWon$ = bool
        }),

    resetGameStates$: () =>
        set((state: IGameState) => {
            state.hasWon$ = false
            state.hasLost$ = false
            state.allowInput$ = false
        }),
})

const useGameState$ = create<IGameState>()(middleware(gameState))

export default useGameState$
