import { LetterGuess } from '@/store/wordle_guess'

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
    return <div className="wordle-letter">{letterObj.letter}</div>
}
