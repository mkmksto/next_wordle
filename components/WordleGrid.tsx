import useRandomWordStore$ from '@/store/random_word'
import useGuessTracker$ from '@/store/wordle_guess'
import useGameState$ from '@/store/game_state'
import { Space_Grotesk } from 'next/font/google'
import { useEffect } from 'react'
import WordleRow from './WordleRow'
import { Bars } from 'react-loader-spinner'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '700'],
})

export default function WordleGrid() {
    const currentRandomWord$ = useRandomWordStore$((state) => state.currentRandomWord$)

    const setCurrentRandomWord$ = useGuessTracker$((state) => state.setCurrentRandomWord$)
    const allGuesses$ = useGuessTracker$((state) => state.allGuesses$)

    const isFetchingNewWord$ = useGameState$((state) => state.isFetchingNewWord$)

    useEffect(() => {
        setCurrentRandomWord$(currentRandomWord$)
    }, [setCurrentRandomWord$, currentRandomWord$])

    return (
        <>
            <div className="h-16 opacity-40">
                {isFetchingNewWord$ && (
                    <Bars
                        height="40"
                        width="40"
                        color="#8a8a8a"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                )}
            </div>

            {/* // words container */}
            <div
                className={`flex flex-col justify-between items-center h-[58%] w-[30%] max-w-fit py-12 bg-darker-pink shadow-lg rounded-3xl text-[1.3rem] ${spaceGrotesk.className}`}
            >
                {/* current rand word: {currentRandomWord$ && currentRandomWord$} */}
                {allGuesses$.map((wordGuess, idx) => (
                    <WordleRow word={wordGuess} key={idx} />
                ))}
            </div>
        </>
    )
}
