import useModalState$ from '@/store/modal_states'
import { signOut, useSession } from 'next-auth/react'
import GenericModalBackground from './GenericModalBackground'

export default function ProfileModal() {
    const showProfileModal$ = useModalState$((state) => state.showProfileModal$)
    const setProfileModal$ = useModalState$((state) => state.setProfileModal$)
    const { data: session } = useSession()

    if (!showProfileModal$) return null

    return (
        <GenericModalBackground onClickModalBackground={() => setProfileModal$(false)}>
            <div className="flex flex-col p-8 bg-white rounded-2xl max-w-[400px]">
                <h3>Profile</h3>
                <div>{session?.user?.name}</div>
                <div>{session?.user?.email}</div>
                <button onClick={() => signOut()} className="settings-buttons mt-8">
                    Sign Out
                </button>
            </div>
        </GenericModalBackground>
    )
}
