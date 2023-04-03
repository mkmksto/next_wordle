import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface IGameState {
    winState$: boolean
    loseState$: boolean
    allowInput$: boolean
    setAllowInput$: (bool: boolean) => void
    resetGameStates$: () => void
}

const gameState = (set: any) => ({
    winState$: false,
    loseState$: false,
    allowInput$: true,

    setAllowInput$: (bool: boolean) =>
        set((state: IGameState) => {
            state.allowInput$ = bool
        }),

    resetGameStates$: () =>
        set((state: IGameState) => {
            state.winState$ = false
            state.loseState$ = false
            state.allowInput$ = false
        }),
})

const useGameState$ = create<IGameState>()(immer(gameState))

export default useGameState$
