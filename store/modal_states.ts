import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import middleware from './zustand_middleware'

interface Store {
    showInvalidGuessModal$: boolean
    showInfoModal$: boolean
    showGameWonModal$: boolean
    showGameLostModal$: boolean
    showGenericErrorModal$: boolean
    resetModals$: () => void
    setInvalidGuessModal$: (bool: boolean) => void
    setInfoModal$: (bool: boolean) => void
    setGameWonModal$: (bool: boolean) => void
    setGameLostModal$: (bool: boolean) => void
    setGenericErrorModal$: (bool: boolean) => void
}

const modalStore = (set: any) => ({
    showInvalidGuessModal$: false,

    showInfoModal$: false,

    showGameWonModal$: false,

    showGameLostModal$: false,

    showGenericErrorModal$: false,

    resetModals$: (): void =>
        set((state: Store) => {
            state.showInvalidGuessModal$ = false
            state.showInfoModal$ = false
            state.showGameWonModal$ = false
            state.showGameLostModal$ = false
        }),

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

    setGenericErrorModal$: (bool: boolean): void =>
        set((state: Store) => {
            state.showGenericErrorModal$ = bool
        }),
})

const useModalState$ = create<Store>()(immer(modalStore))

export default useModalState$
