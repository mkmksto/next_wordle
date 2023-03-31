import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BsGear, BsFlag } from 'react-icons/bs'
import { MdRestartAlt } from 'react-icons/md'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-grotesk',
    weight: ['400', '700'],
})

export default function NavBar() {
    return (
        <nav className="fixed h-screen z-50 w-20 flex flex-col items-center bg-pink-300 justify-around">
            <ul>
                <li className="nav-list">
                    <AiOutlineInfoCircle />
                </li>
                <li className="nav-list mt-4">
                    <BsGear />
                </li>
            </ul>
            <div className={` font-bold select-none ${spaceGrotesk.variable} font-sans vert-text`}>
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
