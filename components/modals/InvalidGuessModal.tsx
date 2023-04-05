import useModalState$ from '@/store/modal_states'
import useGuessTracker$ from '@/store/wordle_guess'
import GenericModalBackground from './GenericModalBackground'

export default function InvalidGuessModal() {
    const showInvalidGuessModal$ = useModalState$((state) => state.showInvalidGuessModal$)

    if (!showInvalidGuessModal$) return null

    return (
        <GenericModalBackground>
            <div className="w-52 h-24 bg-white flex items-center justify-center absolute top-1/4 rounded-lg text-xl">
                Word Not Found
            </div>
        </GenericModalBackground>
    )
}
