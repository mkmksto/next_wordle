import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Store {
    greyKeys$: string
    yellowKeys$: string
    greenKeys$: string
    setGreyKeys$: (keys: string) => void
    setYellowKeys$: (keys: string) => void
    setGreenKeys$: (keys: string) => void
    clearKeyboardColors$: () => void
}

const keyboardColors = (set: any) => ({
    greyKeys$: '',

    yellowKeys$: '',

    greenKeys$: '',

    setGreyKeys$: (keys: string): void =>
        set((state: Store) => {
            state.greyKeys$ = keys
        }),

    setYellowKeys$: (keys: string): void =>
        set((state: Store) => {
            state.yellowKeys$ = keys
        }),

    setGreenKeys$: (keys: string): void =>
        set((state: Store) => {
            state.greenKeys$ = keys
        }),

    clearKeyboardColors$: () =>
        set((state: Store) => {
            state.greyKeys$ = ''
            state.yellowKeys$ = ''
            state.greenKeys$ = ''
        }),
})

const useKeyboardColors$ = create(immer(keyboardColors))

export default useKeyboardColors$
