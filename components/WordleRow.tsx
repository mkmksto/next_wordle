import useGameState$ from '@/store/game_state'
import useGuessTracker$, { LetterGuess } from '@/store/wordle_guess'
import { useEffect } from 'react'

interface RowProps {
    word: LetterGuess[]
}

export default function WordleRow({ word }: RowProps) {
    return (
        <div className="wordle-word">
            {word.map((letter, idx) => (
                <WordleLetter letterObj={letter} letterIdx={idx} key={letter.id} />
            ))}
        </div>
    )
}

interface LetterProps {
    letterObj: LetterGuess
    letterIdx: number
}

function WordleLetter({ letterObj, letterIdx }: LetterProps) {
    const colorRevealToggleSwitch$ = useGameState$((state) => state.colorRevealToggleSwitch$)
    const setColorRevealValue$ = useGuessTracker$((state) => state.setColorRevealValue$)

    useEffect(() => {
        // console.log('color reveal switch has been toggled', colorRevealToggleSwitch$)
        if (letterObj.isLetterInWord) {
            setColorRevealValue$(letterObj.id, `bg-yellow-500`)
        } else if (letterObj.isLetterInCorrectPosition) {
            setColorRevealValue$(letterObj.id, `bg-green-500`)
        } else if (!letterObj.isLetterInWord) {
            setColorRevealValue$(letterObj.id, `bg-neutral-400`)
        }
        if (letterObj.isBlank) setColorRevealValue$(letterObj.id, '')
    }, [colorRevealToggleSwitch$, setColorRevealValue$])

    return (
        <div
            className={`wordle-letter ${letterObj.colorRevealValue} transition ease-in`}
            style={{ transitionDelay: `${250 * letterIdx}ms` }}
        >
            {letterObj.letter}
        </div>
    )
}
