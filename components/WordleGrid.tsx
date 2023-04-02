import { Space_Grotesk } from 'next/font/google'
import { useEffect, useState } from 'react'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '700'],
})

export default function WordleGrid() {
    const [currentGuess, setCurrentGuess] = useState<string[]>(Array(5).fill(''))
    console.log(currentGuess)

    useEffect(() => {
        function onKeyUp(e: KeyboardEvent) {
            e.preventDefault()
            const key = e.key

            if (/^[a-zA-Z]$/.test(e.key)) {
                setCurrentGuess((state) => [...state, e.key])
                console.log(currentGuess)
            } else if (key === 'Backspace' || key === '{bksp}') {
                console.log('bksp')
            } else if (key === 'Enter' || key === '{enter}') {
                console.log('Enter')
            }
        }
        window.addEventListener('keyup', onKeyUp)

        return () => window.removeEventListener('keyup', onKeyUp)
    }, [currentGuess])

    return (
        // words container
        <div
            className={`flex flex-col justify-between items-center bg-custom-red h-[58%] w-[60%] py-12 rounded-3xl text-[1.3rem] ${spaceGrotesk.className}`}
        >
            {/* word */}
            {currentGuess.map((_, idx) => (
                <div className="wordle-word" key={idx}>
                    <div className="wordle-letter"></div>
                    <div className="wordle-letter"></div>
                    <div className="wordle-letter"></div>
                    <div className="wordle-letter"></div>
                    <div className="wordle-letter"></div>
                </div>
            ))}
        </div>
    )
}
