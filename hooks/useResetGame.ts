// import useGameSettings$ from '@/store/game_settings'
// import useGameState$ from '@/store/game_state'
// import useKeyboardColors$ from '@/store/keyboard_colors'
// import useModalState$ from '@/store/modal_states'
// import useRandomWordStore$ from '@/store/random_word'
// import useGuessTracker$ from '@/store/wordle_guess'
// import { useEffect } from 'react'
// import useRandomWordFetch from './useRandomWordFetch'
//
// export default function useResetGame() {
//     const resetGameStates$ = useGameState$((state) => state.resetGameStates$)
//     // const setAllowInput$ = useGameState$((state) => state.setAllowInput$)
//     const resetModals$ = useModalState$((state) => state.resetModals$)
//     // const renewCurrentWord$ = useRandomWordStore$((state) => state.renewCurrentWord$)
//     const resetGuessTrackingStore$ = useGuessTracker$((state) => state.resetGuessTrackingStore$)
//     const changeNumBoxesPerRow$ = useGuessTracker$((state) => state.changeNumBoxesPerRow$)
//     const gameSettings$ = useGameSettings$((state) => state.gameSettings$)
//
//     const setGenericErrorModal$ = useModalState$((state) => state.setGenericErrorModal$)
//     const clearKeyboardColors$ = useKeyboardColors$((state) => state.clearKeyboardColors$)
//
//     // const { randomWord } = useRandomWordFetch(gameSettings$)
//
//     // const setCurrentWord$ = useRandomWordStore$((state) => state.setCurrentWord$)
//
//     let error = null
//     function handleReset() {
//         try {
//             resetModals$()
//             resetGameStates$()
//             // remove keyboard colors
//             changeNumBoxesPerRow$(gameSettings$.num_chars)
//             clearKeyboardColors$()
//             resetGuessTrackingStore$()
//
//             // await renewCurrentWord$(gameSettings$)
//             // setAllowInput$(true)
//         } catch (err) {
//             setGenericErrorModal$(true)
//         }
//     }
//
//     return { handleReset, error }
// }
