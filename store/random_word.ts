import my_fetch from '@/services/my_fetch'
import type { IGameSettings } from '@/store/game_settings'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface IRandomWordState {
    currentRandomWord$: string
    renewCurrentWord$: (gameSettings: IGameSettings) => Promise<void>
    clearCurRandomWord$: () => void
}

// interface IBackendRandWordResponse {
//     random_word: string
// }

const wordStore = (set: any) => ({
    currentRandomWord$: '',

    async renewCurrentWord$(gameSettings: IGameSettings) {
        // TODO: send game settings as body to endpoint
        const [backendData, error] = await my_fetch('/api/get_random_word', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(gameSettings),
        })
        if (error) {
            set((state: IRandomWordState) => {
                state.clearCurRandomWord$()
            })
            return
        }
        set((state: IRandomWordState) => {
            state.currentRandomWord$ = backendData.random_word
        })
    },

    clearCurRandomWord$: () => set((state: IRandomWordState) => (state.currentRandomWord$ = '')),
})

const useRandomWordStore$ = create<IRandomWordState>()(immer(wordStore))

export default useRandomWordStore$
