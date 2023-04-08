// import useResetGame from '@/hooks/useResetGame'
import useModalState$ from '@/store/modal_states'
import useRandomWordStore$ from '@/store/random_word'
import useResetSwitch$ from '@/store/reset_switch'
import { Inter, Space_Grotesk } from 'next/font/google'
import GenericModalBackground from './GenericModalBackground'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '700'] })

export default function GameWonModal() {
    const showGameLostModal$ = useModalState$((state) => state.showGameLostModal$)
    const currentRandomWord$ = useRandomWordStore$((state) => state.currentRandomWord$)

    // const { handleReset } = useResetGame()
    const resetState$ = useResetSwitch$((state) => state.resetState$)
    const setResetState$ = useResetSwitch$((state) => state.setResetState$)

    if (!showGameLostModal$) return null

    return (
        <GenericModalBackground>
            <div className={`${inter.className} bg-white p-8 rounded-xl`}>
                <div className="flex flex-col justify-between">
                    <h3 className="text-5xl font-bold text-neutral-500 mb-8">Game Over</h3>
                    <div className="text-lg">The Answer was</div>
                    <div className={`flex ${spaceGrotesk.className}`}>
                        {!!currentRandomWord$ &&
                            currentRandomWord$.split('').map((letter, idx) => (
                                <div key={idx} className="wordle-letter text-xl bg-orange-500">
                                    {letter}
                                </div>
                            ))}
                    </div>
                    <button
                        onClick={() => setResetState$(!resetState$)}
                        className="mt-10 w-full bg-neutral-500 py-1 rounded-lg text-white outline-none"
                    >
                        Restart
                    </button>
                </div>
            </div>
        </GenericModalBackground>
    )
}
