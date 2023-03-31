import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '700'],
})

export default function WordleGrid() {
    return (
        // words container
        <div
            className={`flex flex-col justify-between items-center bg-orange-600 h-[58%] w-[60%] py-12 rounded-3xl text-2xl font-bold ${spaceGrotesk.className}`}
        >
            {/* word */}
            {new Array(6).fill(0).map((_, idx) => (
                <div className="wordle-word" key={idx}>
                    <div className="wordle-letter">A</div>
                    <div className="wordle-letter">B</div>
                    <div className="wordle-letter">C</div>
                    <div className="wordle-letter">D</div>
                    <div className="wordle-letter">D</div>
                </div>
            ))}
        </div>
    )
}
