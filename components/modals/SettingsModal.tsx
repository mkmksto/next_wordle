import { useRef } from 'react'

interface Props {
    showModal: boolean
    onModalBgClicked: () => void
}

export default function SettingsModal({ showModal, onModalBgClicked }: Props) {
    const modalBgRef = useRef<HTMLDivElement>(null)

    if (!showModal) return null

    return (
        <div
            ref={modalBgRef}
            onClick={(e) => {
                const target = e.target as HTMLDivElement
                if (target.classList.contains('fixed')) onModalBgClicked()
            }}
            className="fixed top-0 left-0 h-screen w-screen z-[100] flex items-center justify-center bg-black/50 "
        >
            <div className="flex flex-col items-center justify-center h-80 w-[40rem] bg-white rounded-3xl">
                Hello
            </div>
        </div>
    )
}
