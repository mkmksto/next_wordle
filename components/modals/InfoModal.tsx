import useModalState$ from '@/store/modal_states'
import { Space_Grotesk } from 'next/font/google'
import GenericModalBackground from './GenericModalBackground'

const spaceGrotesk = Space_Grotesk({
    weight: ['400', '700'],
    subsets: ['latin'],
})

export default function InfoModal() {
    const showInfoModal$ = useModalState$((state) => state.showInfoModal$)
    const setInfoModal$ = useModalState$((state) => state.setInfoModal$)

    if (!showInfoModal$) return null

    return (
        <GenericModalBackground onClickModalBackground={() => setInfoModal$(false)}>
            <div className="p-10 bg-white rounded-2xl max-w-[600px]">
                <h1>Instructions</h1>
                <section>
                    <p>Guess the hidden word in 6 tries</p>
                    <p>
                        With each guess, the colors of each letter will change according to how
                        close to the word your are
                    </p>
                    <p>
                        Enter a word to start the game, for example, assume that our secret word is
                        &quot;watch&quot;. Typing &quot;wears&quot; would result in the following:
                    </p>

                    <div className="flex justify-center">
                        {['W', 'E', 'A', 'R', 'S'].map((l, idx) => (
                            <div
                                className={`wordle-letter text-xl ${spaceGrotesk.className} ${
                                    l === 'W' && 'bg-green-500'
                                } ${l === 'A' && 'bg-yellow-500'}`}
                                key={`${l}-${idx}`}
                            >
                                {l}
                            </div>
                        ))}
                    </div>

                    <h3>Legend</h3>
                    <p>
                        <div>W is in the correct position</div>
                        <div>A is in the word but not in the correct position</div>
                        <div>E, R, S are nowhere in the word</div>
                    </p>

                    <h3>Other Examples</h3>

                    <div className={`flex justify-center ${spaceGrotesk.className}`}>
                        <div
                            className={`wordle-letter text-xl bg-green-500 ${spaceGrotesk.className}`}
                        >
                            W
                        </div>
                        <div
                            className={`wordle-letter text-xl bg-yellow-500 ${spaceGrotesk.className}`}
                        >
                            H
                        </div>
                        <div className={`wordle-letter text-xl ${spaceGrotesk.className}`}>E</div>
                        <div
                            className={`wordle-letter text-xl bg-yellow-500 ${spaceGrotesk.className}`}
                        >
                            A
                        </div>
                        <div
                            className={`wordle-letter text-xl bg-yellow-500 ${spaceGrotesk.className}`}
                        >
                            T
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <div className={`wordle-letter text-xl ${spaceGrotesk.className}`}>C</div>
                        <div
                            className={`wordle-letter text-xl bg-green-500 ${spaceGrotesk.className}`}
                        >
                            A
                        </div>
                        <div
                            className={`wordle-letter text-xl bg-green-500 ${spaceGrotesk.className}`}
                        >
                            T
                        </div>
                        <div
                            className={`wordle-letter text-xl bg-green-500 ${spaceGrotesk.className}`}
                        >
                            C
                        </div>
                        <div
                            className={`wordle-letter text-xl bg-green-500 ${spaceGrotesk.className}`}
                        >
                            H
                        </div>
                    </div>
                </section>
            </div>
        </GenericModalBackground>
    )
}
