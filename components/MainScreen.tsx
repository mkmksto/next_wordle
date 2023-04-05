import useGameState$ from '@/store/game_state'
import useGameSettings$ from '@/store/game_settings'
import useGuessTracker$ from '@/store/wordle_guess'
import Keyboard from './Keyboard'
import WordleGrid from './WordleGrid'
import { sleep } from '@/services/misc_utils'

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

    const setAllowInput$ = useGameState$((state) => state.setAllowInput$)
    const setWonState$ = useGameState$((state) => state.setWonState$)
    const toggleColorRevealSwitch$ = useGameState$((state) => state.toggleColorRevealSwitch$)

    const gameSettings$ = useGameSettings$((state) => state.gameSettings$)

    async function onEnter() {
        setAllowInput$(false)

        if (!isCurrentRowFilled$()) {
            console.log('row isnt filled')
            setAllowInput$(true)
            return
        }
        const isGuessValid = await isGuessValid$(gameSettings$.difficulty)
        if (!isGuessValid) {
            // TODO:
            // show invalid guess modal
            // await sleep(1000)
            // remove invalid guess modal
            console.log('invalid guess bitch!')

            setAllowInput$(true)
            return
        }
        console.log('valid guess')

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
            console.log('user has won!')
            setAllowInput$(false)
            setWonState$(true)
            // await sleep(1000)

            return
        }

        incrementRow$()
        setAllowInput$(true)
    }

    function hasUserWon(): boolean {
        if (isGuessCorrect$()) return true
        return false
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
