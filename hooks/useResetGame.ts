import useGameSettings$ from '@/store/game_settings'
import useGameState$ from '@/store/game_state'
import useModalState$ from '@/store/modal_states'
import useRandomWordStore$ from '@/store/random_word'
import useGuessTracker$ from '@/store/wordle_guess'

export default function useResetGame() {
    const resetGameStates$ = useGameState$((state) => state.resetGameStates$)
    const setAllowInput$ = useGameState$((state) => state.setAllowInput$)
    const resetModals$ = useModalState$((state) => state.resetModals$)
    const renewCurrentWord$ = useRandomWordStore$((state) => state.renewCurrentWord$)
    const resetGuessTrackingStore$ = useGuessTracker$((state) => state.resetGuessTrackingStore$)
    const changeNumBoxesPerRow$ = useGuessTracker$((state) => state.changeNumBoxesPerRow$)
    const gameSettings$ = useGameSettings$((state) => state.gameSettings$)

    const setGenericErrorModal$ = useModalState$((state) => state.setGenericErrorModal$)
    const setGameLostModal$ = useModalState$((state) => state.setGameLostModal$)

    let error = null
    async function handleReset() {
        try {
            resetModals$()
            resetGameStates$()
            // remove keyboard colors
            changeNumBoxesPerRow$(gameSettings$.num_chars)
            resetGuessTrackingStore$()

            await renewCurrentWord$(gameSettings$)
            setAllowInput$(true)
        } catch (err) {
            setGenericErrorModal$(true)
        }
    }

    return { handleReset, error }
}
