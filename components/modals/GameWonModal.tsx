import useModalState$ from '@/store/modal_states'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] })

export default function GameWonModal() {
    const showGameWonModal$ = useModalState$((state) => state.showGameWonModal$)

    if (!showGameWonModal$) return null

    return (
        <div
            className={`absolute top-[6%] left-[42%] px-4 rounded-md text-white z-50 translate-x-[47%] text-2xl font-bold bg-orange-400 ${inter.className}`}
        >
            You Win!
        </div>
    )
}
