import { my_new_fetch } from '@/services/my_fetch'
import { IGameSettings } from '@/store/game_settings'
import useGameState$ from '@/store/game_state'
import useModalState$ from '@/store/modal_states'
import useRandomWordStore$ from '@/store/random_word'
import useResetSwitch$ from '@/store/reset_switch'
import useGuessTracker$ from '@/store/wordle_guess'
import useGameSettings$ from '@/store/game_settings'
import useKeyboardColors$ from '@/store/keyboard_colors'
import { useEffect, useState } from 'react'

export interface FetchResponse {
    random_word: string
}

export default function useRandomWordFetch(gameSettings: IGameSettings, dependencies?: any[]) {
    const [randomWord, setRandomWord] = useState('')
    const [fetchError, setFetchError] = useState('')
    const [isLoading, setLoading] = useState(false)

    const setCurrentWord$ = useRandomWordStore$((state) => state.setCurrentWord$)
    const setGenericErrorModal$ = useModalState$((state) => state.setGenericErrorModal$)
    const setIsFetchingNewWord$ = useGameState$((state) => state.setIsFetchingNewWord$)
    const setAllowInput$ = useGameState$((state) => state.setAllowInput$)

    const resetState$ = useResetSwitch$((state) => state.resetState$)

    const resetGameStates$ = useGameState$((state) => state.resetGameStates$)
    const resetModals$ = useModalState$((state) => state.resetModals$)
    const resetGuessTrackingStore$ = useGuessTracker$((state) => state.resetGuessTrackingStore$)
    const changeNumBoxesPerRow$ = useGuessTracker$((state) => state.changeNumBoxesPerRow$)
    const gameSettings$ = useGameSettings$((state) => state.gameSettings$)

    const clearKeyboardColors$ = useKeyboardColors$((state) => state.clearKeyboardColors$)

    useEffect(
        () => {
            const controller = new AbortController()

            setLoading(true)
            setIsFetchingNewWord$(true)
            setAllowInput$(false)

            resetModals$()
            resetGameStates$()
            changeNumBoxesPerRow$(gameSettings$.num_chars)
            clearKeyboardColors$()
            resetGuessTrackingStore$()

            my_new_fetch('/api/get_random_word', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(gameSettings),
            })
                .then((data) => {
                    console.log('then block')
                    setRandomWord(data?.random_word)
                    setCurrentWord$(data?.random_word)
                    setLoading(false)
                    setIsFetchingNewWord$(false)
                    setAllowInput$(true)
                    // throw new Error('sample error')
                })
                .catch((_err) => {
                    console.log('catch block')
                    setFetchError('An Error has occured, please try again.')
                    setGenericErrorModal$(true)
                    setLoading(false)
                    setIsFetchingNewWord$(false)
                    setAllowInput$(false)
                })

            return () => controller.abort()
        },
        dependencies ? [...dependencies, resetState$] : [resetState$],
    )

    return { randomWord, fetchError, isLoading }
}
