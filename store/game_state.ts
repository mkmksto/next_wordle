import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import middleware from './zustand_middleware'

interface IGameState {
    hasWon$: boolean
    hasLost$: boolean
    allowInput$: boolean
    colorRevealToggleSwitch$: boolean // just a switch, whether it's T or F doesn't matter
    isFetchingNewWord$: boolean
    setAllowInput$: (bool: boolean) => void
    setWonState$: (bool: boolean) => void
    setLoseState$: (bool: boolean) => void
    resetGameStates$: () => void
    toggleColorRevealSwitch$: () => void
    setIsFetchingNewWord$: (bool: boolean) => void
}

const gameState = (set: any) => ({
    hasWon$: false,
    hasLost$: false,
    allowInput$: true,
    colorRevealToggleSwitch$: false,
    isFetchingNewWord$: false,

    setAllowInput$: (bool: boolean): void =>
        set((state: IGameState) => {
            state.allowInput$ = bool
        }),

    setWonState$: (bool: boolean): void =>
        set((state: IGameState) => {
            state.hasWon$ = bool
        }),

    setLoseState$: (bool: boolean): void =>
        set((state: IGameState) => {
            state.hasLost$ = bool
        }),

    resetGameStates$: (): void =>
        set((state: IGameState): void => {
            state.hasWon$ = false
            state.hasLost$ = false
            state.allowInput$ = false
        }),

    toggleColorRevealSwitch$: (): void =>
        set((state: IGameState) => {
            state.colorRevealToggleSwitch$ = !state.colorRevealToggleSwitch$
        }),

    setIsFetchingNewWord$: (bool: boolean) =>
        set((state: IGameState) => {
            state.isFetchingNewWord$ = bool
        }),
})

const useGameState$ = create<IGameState>()(immer(gameState))

export default useGameState$
