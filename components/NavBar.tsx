import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BsGear, BsFlag } from 'react-icons/bs'
import { MdRestartAlt } from 'react-icons/md'
import { Space_Grotesk } from 'next/font/google'
import useResetGame from '@/hooks/useResetGame'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '700'],
})

interface Props {
    onSettingsClicked: () => void
}

export default function NavBar({ onSettingsClicked }: Props) {
    const { handleReset } = useResetGame()

    return (
        <nav className="h-screen z-50 flex flex-col items-center justify-around">
            <ul>
                <li className="nav-list">
                    <AiOutlineInfoCircle className="text-neutral-500" />
                </li>
                <li onClick={() => onSettingsClicked()} className="nav-list mt-4">
                    <BsGear className="text-neutral-500" />
                </li>
            </ul>
            <div
                className={`select-none ${spaceGrotesk.className} font-sans vert-text bg-orange-400 py-4 text-white rounded-2xl mb-10`}
            >
                WORDLE
            </div>

            <div>
                <ul>
                    <li className="nav-list">
                        <BsFlag className="text-neutral-500" />
                    </li>
                    <li className="nav-list mt-2 mb-8">
                        <MdRestartAlt onClick={handleReset} className="text-neutral-500" />
                    </li>
                </ul>
            </div>
        </nav>
    )
}
