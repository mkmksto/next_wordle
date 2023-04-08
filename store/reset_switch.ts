import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Store {
    resetState$: boolean
    setResetState$: (bool: boolean) => void
}

const resetSwitch = (set: any) => ({
    resetState$: false,

    setResetState$: (bool: boolean) =>
        set((state: Store) => {
            state.resetState$ = bool
        }),
})

const useResetSwitch$ = create(immer(resetSwitch))
export default useResetSwitch$
