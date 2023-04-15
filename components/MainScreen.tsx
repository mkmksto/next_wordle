import useGameState$ from '@/store/game_state'
import useGameSettings$ from '@/store/game_settings'
import useGuessTracker$ from '@/store/wordle_guess'
import WordleGrid from './WordleGrid'
import { sleep } from '@/services/misc_utils'
import useModalState$ from '@/store/modal_states'
import useGameLost from '@/hooks/useGameLost'
import KeyboardComponent from './Keyboard'
import useKeyboardColors$ from '@/store/keyboard_colors'
import { useSession } from 'next-auth/react'
import { createSpClient } from '@/lib/supabaseClient'

// import { supabase } from '@/lib/supabaseClient'

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
    const lettersInWord$ = useGuessTracker$((state) => state.lettersInWord$)
    const lettersNotInWord$ = useGuessTracker$((state) => state.lettersNotInWord$)
    const lettersInCorrectPosition$ = useGuessTracker$((state) => state.lettersInCorrectPosition$)
    const currentFlattenedGuess$ = useGuessTracker$((state) => state.currentFlattenedGuess$)

    const setAllowInput$ = useGameState$((state) => state.setAllowInput$)
    const setWonState$ = useGameState$((state) => state.setWonState$)
    const toggleColorRevealSwitch$ = useGameState$((state) => state.toggleColorRevealSwitch$)
    const setLoseState$ = useGameState$((state) => state.setLoseState$)

    const gameSettings$ = useGameSettings$((state) => state.gameSettings$)

    const setInvalidGuessModal$ = useModalState$((state) => state.setInvalidGuessModal$)
    const setGameWonModal$ = useModalState$((state) => state.setGameWonModal$)

    const setYellowKeys$ = useKeyboardColors$((state) => state.setYellowKeys$)
    const setGreyKeys$ = useKeyboardColors$((state) => state.setGreyKeys$)
    const setGreenKeys$ = useKeyboardColors$((state) => state.setGreenKeys$)

    const { setGameStateToLost } = useGameLost()

    const { data: session } = useSession()
    const { supabaseAccessToken } = session ?? {}
    const supabase = createSpClient(supabaseAccessToken ?? '')

    async function onEnter() {
        setAllowInput$(false)

        if (!isCurrentRowFilled$()) {
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
        setYellowKeys$(lettersInWord$())
        setGreyKeys$(lettersNotInWord$())
        setGreenKeys$(lettersInCorrectPosition$())

        if (await hasUserWon()) {
            setAllowInput$(false)
            await sleep(50)
            setGameWonModal$(true)
            setWonState$(true)
            setLoseState$(false)
            return
        }

        if (hasUserLost()) {
            setGameStateToLost()
            return
        }

        incrementRow$()
        setAllowInput$(true)
    }

    async function hasUserWon(): Promise<boolean> {
        let { data: supabaseIsGuessCorrect, error } = await supabase.rpc(
            'check_word_and_update_scores',
            {
                word_to_test: currentFlattenedGuess$(),
                id: session?.user.id,
            },
        )

        if (error) console.error(error)
        if (supabaseIsGuessCorrect !== null || supabaseIsGuessCorrect !== undefined) {
            console.log(`supabase check, guess is: ${supabaseIsGuessCorrect}`)
        }

        // check the backend DB instead of the frontend, this is more secure
        if (supabaseIsGuessCorrect === true) return true
        if (isGuessCorrect$()) return true
        return false
    }

    function hasUserLost(): boolean {
        if (isAllRowsFilled$() && !isGuessCorrect$() && isCurrentRowTheLastRow$()) {
            supabase
                .rpc('increment_losses', {
                    id: session?.user.id,
                })
                .then(({ data, error }) => {
                    if (error) console.error(error)
                })
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
            <KeyboardComponent
                onKeyboardUp={(keyStroke) => addLetterToGuess$(keyStroke)}
                onBackSpace={() => removeLastLetterFromGuess$()}
                onEnter={async () => await onEnter()}
            />
        </div>
    )
}
