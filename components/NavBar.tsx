import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BsGear, BsFlag } from 'react-icons/bs'
import { MdRestartAlt } from 'react-icons/md'
import { Space_Grotesk } from 'next/font/google'
import useResetGame from '@/hooks/useResetGame'
import useGameLost from '@/hooks/useGameLost'
import useModalState$ from '@/store/modal_states'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '700'],
})

interface Props {
    onSettingsClicked: () => void
}

export default function NavBar({ onSettingsClicked }: Props) {
    const setInfoModal$ = useModalState$((state) => state.setInfoModal$)
    const { handleReset } = useResetGame()
    const { setGameStateToLost } = useGameLost()

    return (
        <nav className="h-screen z-50 flex flex-col items-center justify-around bg-darker-pink">
            <ul className="mt-8">
                <li onClick={() => setInfoModal$(true)} className="nav-list">
                    <AiOutlineInfoCircle className="navbar-icons" />
                </li>
                <li onClick={() => onSettingsClicked()} className="nav-list mt-4">
                    <BsGear className="navbar-icons" />
                </li>
            </ul>
            <div
                className={`select-none ${spaceGrotesk.className} font-sans vert-text bg-darker-pink py-4 text-white rounded-2xl mb-10`}
            >
                WORDLE
            </div>

            <div className="p-3 py-5 rounded-md mb-16">
                <ul>
                    <li className="nav-list">
                        <BsFlag onClick={setGameStateToLost} className="navbar-icons" />
                    </li>
                    <li className="nav-list mt-2">
                        <MdRestartAlt onClick={handleReset} className="navbar-icons" />
                    </li>
                </ul>
            </div>
        </nav>
    )
}
