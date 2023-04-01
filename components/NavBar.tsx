import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BsGear, BsFlag } from 'react-icons/bs'
import { MdRestartAlt } from 'react-icons/md'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '700'],
})

interface Props {
    onSettingsClicked: () => void
}

export default function NavBar({ onSettingsClicked }: Props) {
    return (
        <nav className="h-screen z-50 flex flex-col items-center justify-around">
            <ul>
                <li className="nav-list">
                    <AiOutlineInfoCircle />
                </li>
                <li onClick={() => onSettingsClicked()} className="nav-list mt-4">
                    <BsGear />
                </li>
            </ul>
            <div className={`select-none ${spaceGrotesk.className} font-sans vert-text`}>
                WORDLE
            </div>

            <div>
                <ul>
                    <li className="nav-list">
                        <BsFlag />
                    </li>
                    <li className="nav-list mt-4">
                        <MdRestartAlt />
                    </li>
                </ul>
            </div>
        </nav>
    )
}
