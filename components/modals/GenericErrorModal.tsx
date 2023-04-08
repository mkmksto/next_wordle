import useModalState$ from '@/store/modal_states'
import GenericModalBackground from './GenericModalBackground'
import { RiCloseCircleLine } from 'react-icons/ri'
import useResetSwitch$ from '@/store/reset_switch'

interface Props {
    errorMessage: string
}

export default function GenericErrorModal({ errorMessage }: Props) {
    const showGenericErrorModal$ = useModalState$((state) => state.showGenericErrorModal$)
    const setGenericErrorModal$ = useModalState$((state) => state.setGenericErrorModal$)

    const resetState$ = useResetSwitch$((state) => state.resetState$)
    const setResetState$ = useResetSwitch$((state) => state.setResetState$)

    if (!showGenericErrorModal$) return null

    return (
        <GenericModalBackground>
            <div className="p-10 bg-white relative -top-1/4 rounded-xl max-w-xs">
                <h3 className="text-xl">{errorMessage}</h3>
                <button
                    onClick={() => {
                        setResetState$(!resetState$)
                        setGenericErrorModal$(false)
                    }}
                    className="w-full bg-neutral-400 text-white font-bold text-xl py-1 rounded-md hover:bg-neutral-500 outline-none"
                >
                    Restart
                </button>
                <RiCloseCircleLine
                    onClick={() => setGenericErrorModal$(false)}
                    className="absolute top-2 right-2 text-2xl text-neutral-500/80 cursor-pointer"
                />
            </div>
        </GenericModalBackground>
    )
}
