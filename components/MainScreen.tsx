import useGameState$ from '@/store/game_state'
import useGameSettings$ from '@/store/game_settings'
import useGuessTracker$ from '@/store/wordle_guess'
import Keyboard from './Keyboard'
import WordleGrid from './WordleGrid'
import { sleep } from '@/services/misc_utils'
import useModalState$ from '@/store/modal_states'

export default function MainScreen() {
    const addLetterToGuess$ = useGuessTracker$((state) => state.addLetterToGuess$)
    const removeLastLetterFromGuess$ = useGuessTracker$(
        (state) => state.removeLastLetterFromGuess$,
    )
    const incrementRow$ = useGuessTracker$((state) => state.incrementRow$)
    const isGuessCorrect$ = useGuessTracker$((state) => state.isGuessCorrect$)
    const isCurrentRowFilled$ = useGuessTracker$((state) => state.isCurrentRowFilled$)
    const isGuessValid$ = useGuessTracker$((state) => state.isGuessValid$)
    const setValidityOfEachLetterInGuess$ = useGuessTracker$(
        (state) => state.setValidityOfEachLetterInGuess$,
    )
    const isAllRowsFilled$ = useGuessTracker$((state) => state.isAllRowsFilled$)
    const isCurrentRowTheLastRow$ = useGuessTracker$((state) => state.isCurrentRowTheLastRow$)

    const setAllowInput$ = useGameState$((state) => state.setAllowInput$)
    const setWonState$ = useGameState$((state) => state.setWonState$)
    const toggleColorRevealSwitch$ = useGameState$((state) => state.toggleColorRevealSwitch$)
    const setLoseState$ = useGameState$((state) => state.setLoseState$)

    const gameSettings$ = useGameSettings$((state) => state.gameSettings$)

    const setInvalidGuessModal$ = useModalState$((state) => state.setInvalidGuessModal$)
    const setGameWonModal$ = useModalState$((state) => state.setGameWonModal$)
    const setGameLostModal$ = useModalState$((state) => state.setGameLostModal$)

    async function onEnter() {
        setAllowInput$(false)

        if (!isCurrentRowFilled$()) {
            console.log('row isnt filled')
            setAllowInput$(true)
            return
        }
        const valid = await isGuessValid()
        if (!valid) return

        setValidityOfEachLetterInGuess$()
        // !IMPORTANT: this WAS the line causing the weird bug, apparently when you toggle
        // something that causes a rerender, the rerender happens async
        // so this entire code block finishes before the `useEffect` inside `WordleRow.tsx` even runs
        // as such it takes an already increment row value of 1 causing the issue where the current row
        // colors aren't even updated
        toggleColorRevealSwitch$()
        // SOLUTION:
        await sleep(1500)

        if (hasUserWon()) {
            // console.log('user has won!')
            setAllowInput$(false)
            await sleep(50)
            setGameWonModal$(true)
            setWonState$(true)
            setLoseState$(false)
            return
        }

        if (hasUserLost()) {
            console.log('user has lost')
            setAllowInput$(false)
            setWonState$(false)
            setLoseState$(true)
            setGameLostModal$(true)
            return
        }

        incrementRow$()
        setAllowInput$(true)
    }

    function hasUserWon(): boolean {
        if (isGuessCorrect$()) return true
        return false
    }

    function hasUserLost(): boolean {
        if (isAllRowsFilled$() && !isGuessCorrect$() && isCurrentRowTheLastRow$()) {
            return true
        }
        return false
    }

    async function isGuessValid(): Promise<boolean> {
        const valid = await isGuessValid$(gameSettings$.difficulty)
        console.log('is guess valid? :', valid)
        if (!valid) {
            setInvalidGuessModal$(true)
            // TODO: show some sort of validating answer spinner or something
            await sleep(1000)
            setInvalidGuessModal$(false)
            setAllowInput$(true)
            return false
        }
        return true
    }

    return (
        <div className={`flex flex-col items-center justify-center h-full w-full -translate-x-16`}>
            <WordleGrid />
            <Keyboard
                onKeyboardUp={(keyStroke) => addLetterToGuess$(keyStroke)}
                onBackSpace={() => removeLastLetterFromGuess$()}
                onEnter={async () => await onEnter()}
            />
        </div>
    )
}
