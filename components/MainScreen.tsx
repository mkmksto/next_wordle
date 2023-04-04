import useGameState$ from '@/store/game_state'
import useGuessTracker$ from '@/store/wordle_guess'
import Keyboard from './Keyboard'
import WordleGrid from './WordleGrid'

export default function GameBox() {
    const addLetterToGuess$ = useGuessTracker$((state) => state.addLetterToGuess$)
    const removeLastLetterFromGuess$ = useGuessTracker$(
        (state) => state.removeLastLetterFromGuess$,
    )
    const incrementRow$ = useGuessTracker$((state) => state.incrementRow$)
    const isGuessCorrect$ = useGuessTracker$((state) => state.isGuessCorrect$)
    const isCurrentRowFilled$ = useGuessTracker$((state) => state.isCurrentRowFilled$)
    const isGuessValid$ = useGuessTracker$((state) => state.isGuessValid$)

    // const allowInput$ = useGameState$((state) => state.allowInput$)
    const setAllowInput$ = useGameState$((state) => state.setAllowInput$)
    // const hasWon$ = useGameState$((state) => state.hasWon$)
    const setWonState$ = useGameState$((state) => state.setWonState$)

    async function onEnter() {
        setAllowInput$(false)
        if (hasUserWon()) {
            console.log('user has won!')
            setAllowInput$(false)
            setWonState$(true)
            // await sleep(1000)

            return
        }

        if (!isCurrentRowFilled$()) {
            console.log('row isnt filled')

            setAllowInput$(true)
            return
        }

        if (!(await isGuessValid$())) {
            // TODO:
            // show invalid guess modal
            // await sleep(1000)
            // remove invalid guess modal
            console.log('invalid guess bitch!')

            setAllowInput$(true)
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
        <div className={`flex flex-col items-center justify-center h-full w-full`}>
            <WordleGrid />
            <Keyboard
                onKeyboardUp={(keyStroke) => addLetterToGuess$(keyStroke)}
                onBackSpace={() => removeLastLetterFromGuess$()}
                onEnter={async () => await onEnter()}
            />
        </div>
    )
}
