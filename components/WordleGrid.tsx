import useGameSettings$ from '@/store/game_settings'
import useRandomWordStore$ from '@/store/random_word'
import useGuessTracker$ from '@/store/wordle_guess'
import { Space_Grotesk } from 'next/font/google'
import { useEffect } from 'react'
import WordleRow from './WordleRow'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '700'],
})

export default function WordleGrid() {
    const gameSettings$ = useGameSettings$((state) => state.gameSettings$)

    const currentRandomWord$ = useRandomWordStore$((state) => state.currentRandomWord$)
    const renewCurrentWord$ = useRandomWordStore$((state) => state.renewCurrentWord$)

    const setCurrentRandomWord$ = useGuessTracker$((state) => state.setCurrentRandomWord$)
    const allGuesses$ = useGuessTracker$((state) => state.allGuesses$)

    useEffect(() => {
        renewCurrentWord$(gameSettings$)
        // setAllowInput$(true)
    }, [])

    useEffect(() => {
        setCurrentRandomWord$(currentRandomWord$)
    }, [setCurrentRandomWord$, currentRandomWord$])

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
