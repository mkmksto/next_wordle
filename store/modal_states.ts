import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import middleware from './zustand_middleware'

interface Store {
    showInvalidGuessModal$: boolean
    showInfoModal$: boolean
    showGameWonModal$: boolean
    showGameLostModal$: boolean
    setInvalidGuessModal$: (bool: boolean) => void
    setInfoModal$: (bool: boolean) => void
    setGameWonModal$: (bool: boolean) => void
    setGameLostModal$: (bool: boolean) => void
}

const modalStore = (set: any) => ({
    showInvalidGuessModal$: false,

    showInfoModal$: false,

    showGameWonModal$: false,

    showGameLostModal$: false,

    setInvalidGuessModal$: (bool: boolean): void =>
        set((state: Store) => {
            state.showInvalidGuessModal$ = bool
        }),

    setInfoModal$: (bool: boolean): void =>
        set((state: Store) => {
            state.showInfoModal$ = bool
        }),

    setGameWonModal$: (bool: boolean): void =>
        set((state: Store) => {
            state.showGameWonModal$ = bool
        }),

    setGameLostModal$: (bool: boolean): void =>
        set((state: Store) => {
            state.showGameLostModal$ = bool
        }),
})

const useModalState$ = create<Store>()(middleware(modalStore))

export default useModalState$
