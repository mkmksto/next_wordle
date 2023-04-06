import useModalState$ from '@/store/modal_states'
import GenericModalBackground from './GenericModalBackground'
import { RiCloseCircleLine } from 'react-icons/ri'

export default function GenericErrorModal() {
    const showGenericErrorModal$ = useModalState$((state) => state.showGenericErrorModal$)
    const setGenericErrorModal$ = useModalState$((state) => state.setGenericErrorModal$)

    if (!showGenericErrorModal$) return null

    return (
        <GenericModalBackground>
            <div className="p-10 bg-white relative -top-1/4 rounded-xl">
                <h3 className="text-xl">An Error has occured</h3>
                <RiCloseCircleLine
                    onClick={() => setGenericErrorModal$(false)}
                    className="absolute top-2 right-2 text-2xl text-neutral-500/80 cursor-pointer"
                />
            </div>
        </GenericModalBackground>
    )
}
