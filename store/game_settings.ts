import { create } from 'zustand'

export interface IGameSettings {
    gameSettings$: { num_chars: number; difficulty: string }
    changeNumChars$: (newSize: number) => void
    resetGameSettings$: () => void
}

const useGameSettings = create<IGameSettings>()((set) => ({
    gameSettings$: { num_chars: 5, difficulty: 'medium' },
    changeNumChars$: (newSize: number) =>
        set((state) => ({ gameSettings$: { ...state.gameSettings$, num_chars: newSize } })),
    resetGameSettings$: () =>
        set((_) => ({ gameSettings$: { num_chars: 5, difficulty: 'medium' } })),
}))

export default useGameSettings
