import { Space_Grotesk } from 'next/font/google'
import { useEffect, useState } from 'react'
import useRandomWordStore$ from '@/store/random_word'
import useGameSettings$ from '@/store/game_settings'
import useGuessTracker$ from '@/store/wordle_guess'
import WordleRow from './WordleRow'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '700'],
})

export default function WordleGrid() {
    const currentRandomWord$ = useRandomWordStore$((state) => state.currentRandomWord$)
    const clearCurrentWord$ = useRandomWordStore$((state) => state.clearCurrentWord$)
    const renewCurrentWord$ = useRandomWordStore$((state) => state.renewCurrentWord$)
    const gameSettings$ = useGameSettings$((state) => state.gameSettings$)

    const setCurrentRandomWord$ = useGuessTracker$((state) => state.setCurrentRandomWord$)
    const allGuesses$ = useGuessTracker$((state) => state.allGuesses$)
    const addLetterToGuess$ = useGuessTracker$((state) => state.addLetterToGuess$)
    const removeLastLetterFromGuess$ = useGuessTracker$(
        (state) => state.removeLastLetterFromGuess$,
    )
    const incrementRow$ = useGuessTracker$((state) => state.incrementRow$)

    useEffect(() => {
        function onKeyUp(e: KeyboardEvent) {
            e.preventDefault()
            const key = e.key

            if (/^[a-zA-Z]$/.test(key)) {
                addLetterToGuess$(key)
            } else if (key === 'Backspace' || key === '{bksp}') {
                removeLastLetterFromGuess$()
            } else if (key === 'Enter' || key === '{enter}') {
                incrementRow$()
            }
        }
        window.addEventListener('keyup', onKeyUp)

        return () => window.removeEventListener('keyup', onKeyUp)
    }, [])

    useEffect(() => {
        renewCurrentWord$(gameSettings$)
        setCurrentRandomWord$(currentRandomWord$)
    }, [])

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
