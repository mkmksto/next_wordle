import { useRef } from 'react'
import SettingsModalCard from './SettingsModalCard'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700'] })

interface Props {
    showModal: boolean
    onModalBgClicked: () => void
    onCloseSettingsModal: () => void
}

export default function SettingsModal({
    showModal,
    onModalBgClicked,
    onCloseSettingsModal,
}: Props) {
    const modalBgRef = useRef<HTMLDivElement>(null)

    if (!showModal) return null

    return (
        <div
            ref={modalBgRef}
            onClick={(e) => {
                const target = e.target as HTMLDivElement
                if (target.classList.contains('fixed')) onModalBgClicked()
            }}
            className={`fixed top-0 left-0 h-screen w-screen z-[100] flex items-center justify-center bg-black/50 ${inter.className}`}
        >
            <SettingsModalCard onCloseSettingsModal={onCloseSettingsModal} />
        </div>
    )
}
