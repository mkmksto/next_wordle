import useGameState$ from '@/store/game_state'
import useGuessTracker$, { LetterGuess } from '@/store/wordle_guess'
import { useEffect } from 'react'

interface RowProps {
    word: LetterGuess[]
}

export default function WordleRow({ word }: RowProps) {
    // const colorRevealToggleSwitch$ = useGameState$((state) => state.colorRevealToggleSwitch$)
    //
    // const setColorRevealValue$ = useGuessTracker$((state) => state.setColorRevealValue$)
    // const isCurrentRowFilled$ = useGuessTracker$((state) => state.isCurrentRowFilled$)
    // const currentGuessArr$ = useGuessTracker$((state) => state.currentGuessArr$)

    // async function revealColors() {
    //     console.log('current row filled?: ', isCurrentRowFilled$())
    //     if (!isCurrentRowFilled$()) return
    //     for (const letterObj of currentGuessArr$()) {
    //         console.log(letterObj)
    //         if (letterObj.isLetterInWord) {
    //             // setColorRevealValue('bg-yellow-500')
    //             setColorRevealValue$(letterObj.id, 'bg-yellow-500')
    //         } else if (letterObj.isLetterInCorrectPosition) {
    //             // setColorRevealValue('bg-green-500')
    //             setColorRevealValue$(letterObj.id, 'bg-green-500')
    //         } else if (!letterObj.isLetterInWord) {
    //             // setColorRevealValue('bg-neutral-400')
    //             setColorRevealValue$(letterObj.id, 'bg-neutral-400')
    //         }
    //         if (letterObj.isBlank) setColorRevealValue('')
    //         await sleep(270)
    //     }
    // }

    // useEffect(() => {
    //     // revealColors()
    //
    //     word.forEach(async (letterObj, idx) => {
    //         if (!isCurrentRowFilled$) return
    //         console.log(letterObj)
    //         if (letterObj.isLetterInWord) {
    //             // setColorRevealValue('bg-yellow-500')
    //             setColorRevealValue$(letterObj.id, `bg-yellow-500 delay-${270 * idx}`)
    //         } else if (letterObj.isLetterInCorrectPosition) {
    //             // setColorRevealValue('bg-green-500')
    //             setColorRevealValue$(letterObj.id, `bg-green-500  delay-${270 * idx} `)
    //         } else if (!letterObj.isLetterInWord) {
    //             // setColorRevealValue('bg-neutral-400')
    //             setColorRevealValue$(letterObj.id, `bg-neutral-400  delay-${270 * idx} `)
    //         }
    //         if (letterObj.isBlank) setColorRevealValue('')
    //         // await sleep(270)
    //     })
    // }, [colorRevealToggleSwitch$])

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
        if (letterObj.isLetterInWord) {
            setColorRevealValue$(letterObj.id, `bg-yellow-500`)
        } else if (letterObj.isLetterInCorrectPosition) {
            setColorRevealValue$(letterObj.id, `bg-green-500`)
        } else if (!letterObj.isLetterInWord) {
            setColorRevealValue$(letterObj.id, `bg-neutral-400`)
        }
        if (letterObj.isBlank) setColorRevealValue$(letterObj.id, '')
    }, [colorRevealToggleSwitch$])

    return (
        <div
            className={`wordle-letter ${letterObj.colorRevealValue} transition ease-in`}
            style={{ transitionDelay: `${250 * letterIdx}ms` }}
        >
            {letterObj.letter}
        </div>
    )
}
