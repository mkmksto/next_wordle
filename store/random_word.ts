import my_fetch from '@/services/my_fetch'
import type { IGameSettings } from '@/store/game_settings'
import { create } from 'zustand'
import middleware from './zustand_middleware'

interface IRandomWordState {
    currentRandomWord$: string
    renewCurrentWord$: (gameSettings: IGameSettings) => Promise<void>
    clearCurrentWord$: () => void
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
                state.clearCurrentWord$()
            })
            return
        }
        set((state: IRandomWordState) => {
            state.currentRandomWord$ = backendData.random_word
        })
    },

    clearCurrentWord$: () => set((state: IRandomWordState) => (state.currentRandomWord$ = '')),
})

const useRandomWordStore$ = create<IRandomWordState>()(middleware(wordStore))

export default useRandomWordStore$
