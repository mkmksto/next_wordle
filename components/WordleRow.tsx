import { LetterGuess } from '@/store/wordle_guess'
import { useEffect, useState } from 'react'
import useGameState$ from '@/store/game_state'

interface RowProps {
    word: LetterGuess[]
}

export default function WordleRow({ word }: RowProps) {
    return (
        <div className="wordle-word">
            {word.map((letter) => (
                <WordleLetter letterObj={letter} key={letter.id} />
            ))}
        </div>
    )
}

interface LetterProps {
    letterObj: LetterGuess
}

function WordleLetter({ letterObj }: LetterProps) {
    const [colorRevealValue, setColorRevealValue] = useState('')
    const colorRevealToggleSwitch$ = useGameState$((state) => state.colorRevealToggleSwitch$)

    useEffect(() => {
        setTimeout(() => {
            if (letterObj.isLetterInWord) {
                setColorRevealValue('bg-yellow-500')
            } else if (letterObj.isLetterInCorrectPosition) {
                setColorRevealValue('bg-green-500')
            } else if (!letterObj.isLetterInWord) {
                setColorRevealValue('bg-neutral-400')
            }
            if (letterObj.isBlank) setColorRevealValue('')
        }, 270)
    }, [colorRevealToggleSwitch$])

    return <div className={`wordle-letter ${colorRevealValue}`}>{letterObj.letter}</div>
}
