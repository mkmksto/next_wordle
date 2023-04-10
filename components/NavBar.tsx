import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BsGear, BsFlag } from 'react-icons/bs'
import { MdRestartAlt } from 'react-icons/md'
import { HiOutlineLogin, HiOutlineLogout } from 'react-icons/hi'
import { Space_Grotesk } from 'next/font/google'
import useGameLost from '@/hooks/useGameLost'
import useModalState$ from '@/store/modal_states'
import useResetSwitch$ from '@/store/reset_switch'
import { signIn, signOut, useSession } from 'next-auth/react'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '700'],
})

interface Props {
    onSettingsClicked: () => void
}

export default function NavBar({ onSettingsClicked }: Props) {
    const setInfoModal$ = useModalState$((state) => state.setInfoModal$)
    const setProfileModal$ = useModalState$((state) => state.setProfileModal$)
    const { setGameStateToLost } = useGameLost()

    const setResetState$ = useResetSwitch$((state) => state.setResetState$)
    const resetState$ = useResetSwitch$((state) => state.resetState$)

    const { data: session, status } = useSession()
    const authenticated = session && status === 'authenticated'

    return (
        <nav className="h-screen z-50 flex flex-col items-center justify-around bg-darker-pink">
            {authenticated ? (
                <div
                    onClick={() => setProfileModal$(true)}
                    className="w-8 h-8 cursor-pointer rounded-full overflow-hidden"
                >
                    <img src={session.user?.image} alt="avatar" />
                </div>
            ) : (
                <div className="w-8 h-8" />
            )}

            <ul>
                {authenticated ? (
                    <li onClick={() => signOut()} className="nav-list">
                        <HiOutlineLogout className="navbar-icons mt-4" />
                    </li>
                ) : (
                    <li onClick={() => signIn()} className="nav-list">
                        <HiOutlineLogin className="navbar-icons" />
                    </li>
                )}

                <li onClick={() => setInfoModal$(true)} className="nav-list mt-4">
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
                        <MdRestartAlt
                            onClick={() => setResetState$(!resetState$)}
                            className="navbar-icons"
                        />
                    </li>
                </ul>
            </div>
        </nav>
    )
}
