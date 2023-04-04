import { Space_Grotesk } from 'next/font/google'
import { useEffect, useState } from 'react'
import useRandomWordStore$ from '@/store/random_word'
import useGameSettings$ from '@/store/game_settings'
import useGuessTracker$ from '@/store/wordle_guess'
import WordleRow from './WordleRow'
import useGameState$ from '@/store/game_state'
import { sleep } from '@/services/misc_utils'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '700'],
})

export default function WordleGrid() {
    const gameSettings$ = useGameSettings$((state) => state.gameSettings$)

    const currentRandomWord$ = useRandomWordStore$((state) => state.currentRandomWord$)
    const clearCurrentWord$ = useRandomWordStore$((state) => state.clearCurrentWord$)
    const renewCurrentWord$ = useRandomWordStore$((state) => state.renewCurrentWord$)

    const setCurrentRandomWord$ = useGuessTracker$((state) => state.setCurrentRandomWord$)
    const allGuesses$ = useGuessTracker$((state) => state.allGuesses$)
    const addLetterToGuess$ = useGuessTracker$((state) => state.addLetterToGuess$)
    const removeLastLetterFromGuess$ = useGuessTracker$(
        (state) => state.removeLastLetterFromGuess$,
    )
    const incrementRow$ = useGuessTracker$((state) => state.incrementRow$)
    const isGuessCorrect$ = useGuessTracker$((state) => state.isGuessCorrect$)
    const isCurrentRowFilled$ = useGuessTracker$((state) => state.isCurrentRowFilled$)
    const isGuessValid$ = useGuessTracker$((state) => state.isGuessValid$)

    const allowInput$ = useGameState$((state) => state.allowInput$)
    const setAllowInput$ = useGameState$((state) => state.setAllowInput$)
    const hasWon$ = useGameState$((state) => state.hasWon$)
    const setWonState$ = useGameState$((state) => state.setWonState$)

    function handleInput(key: string) {
        if (hasWon$ || !allowInput$) return
        if (/^[a-zA-Z]$/.test(key)) {
            addLetterToGuess$(key)
        } else if (key === 'Backspace' || key === '{bksp}') {
            removeLastLetterFromGuess$()
        } else if (key === 'Enter' || key === '{enter}') {
            onEnter()
        }
    }

    async function onEnter() {
        if (hasUserWon()) {
            console.log('user has won!')
            setAllowInput$(false)
            setWonState$(true)
            // await sleep(1000)

            return
        }

        if (!isCurrentRowFilled$()) {
            console.log('row isnt filled')
            return
        }

        if (!(await isGuessValid$())) {
            // TODO:
            // show invalid guess modal
            // await sleep(1000)
            // remove invalid guess modal
            console.log('invalid guess bitch!')
            // setAllowInput$(true)
            return
        }

        incrementRow$()
    }

    useEffect(() => {
        function onKeyUp(e: KeyboardEvent) {
            e.preventDefault()
            handleInput(e.key)
        }
        window.addEventListener('keyup', onKeyUp)

        return () => window.removeEventListener('keyup', onKeyUp)
    }, [])

    useEffect(() => {
        renewCurrentWord$(gameSettings$)
        // setAllowInput$(true)
    }, [])

    useEffect(() => {
        setCurrentRandomWord$(currentRandomWord$)
    }, [setCurrentRandomWord$, currentRandomWord$])

    function hasUserWon(): boolean {
        if (isGuessCorrect$()) return true
        return false
    }

    return (
        // words container
        <div
            className={`flex flex-col justify-between items-center bg-custom-red h-[58%] w-[60%] py-12 rounded-3xl text-[1.3rem] ${spaceGrotesk.className}`}
        >
            current rand word: {currentRandomWord$ && currentRandomWord$}
            {allGuesses$.map((wordGuess, idx) => (
                <WordleRow word={wordGuess} key={idx} />
            ))}
        </div>
    )
}
