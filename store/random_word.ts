import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import type { IGameSettings } from '@/store/game_settings'
import my_fetch from '@/services/my_fetch'

interface IRandomWordState {
    currentRandomWord$: string
    renewCurrentWord$: (gameSettings: IGameSettings) => Promise<void>
    clearCurrentWord$: () => void
}

// interface IBackendRandWordResponse {
//     random_word: string
// }

// const peopleStore = (set: any) => ({
//     people: ['Mary Sue', 'Jane Doe'],
//     addPerson: (person: string) =>
//         set((state: IPeopleState) => ({ people: [...state.people, person] })),
// })

const wordStore = (set: any) => ({
    currentRandomWord$: '',
    async renewCurrentWord$(gameSettings: IGameSettings) {
        const [backendData, error] = await my_fetch('/api/get_random_word')
        if (error) this.clearCurrentWord$()
        set((_state: IRandomWordState) => ({ currentRandomWord$: backendData }))
    },
    clearCurrentWord$() {
        set((_state: IRandomWordState) => ({ currentRandomWord$: '' }))
    },
})

const useRandomWordStore = create<IRandomWordState>()(devtools(wordStore))

// // persist: https://github.com/pmndrs/zustand#persist-middleware
// const usePeopleStore = create<IPeopleState>()(
//     devtools(
//         persist(peopleStore, {
//             name: 'people-store',
//             storage: createJSONStorage(() => localStorage),
//         }),
//     ),
// )

export default useRandomWordStore
