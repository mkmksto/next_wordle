import useModalState$ from '@/store/modal_states'
import { createClient } from '@supabase/supabase-js'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner'
import GenericModalBackground from './GenericModalBackground'

import { createSpClient } from '@/lib/supabaseClient'

export default function ProfileModal() {
    const setProfileModal$ = useModalState$((state) => state.setProfileModal$)
    const { data: session, status } = useSession()

    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [nextAuthId, setId] = useState('')
    const [wins, setWins] = useState(0)
    const [losses, setLosses] = useState(0)

    useEffect(() => {
        // console.log(`session: ${JSON.stringify(session)}`)
        fetchProfile()
        fetchStats()
    }, [session])

    if (!session) return null
    const { supabaseAccessToken } = session
    const supabase = createSpClient(supabaseAccessToken ?? '')

    async function fetchStats() {
        try {
            const { data, error } = await supabase
                .from('scores')
                .select()
                .eq('userId', session?.user.id)
                .single()
            if (error) throw error
            if (data) {
                setWins(data.wins)
                setLosses(data.losses)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function fetchProfile() {
        try {
            setLoading(true)
            const { data, error, status } = await supabase
                .from('users')
                .select()
                .eq('id', session?.user.id)
                // .eq('email', session?.user.email)
                .single()

            if (error) throw error
            if (data) {
                setName(data.name)
                setEmail(data.email)
                setId(data.id)
            }
        } catch (err) {
            console.error(err)
            alert('Error loading user data')
        } finally {
            setLoading(false)
        }
    }

    return (
        <GenericModalBackground onClickModalBackground={() => setProfileModal$(false)}>
            <div className="flex flex-col p-8 bg-white rounded-2xl max-w-[400px]">
                <h3>Profile</h3>
                {loading ? (
                    <div className="w-[200px] h-full flex items-center justify-center">
                        <Bars
                            height="40"
                            width="40"
                            color="#8a8a8a"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>
                ) : (
                    <>
                        <div>{name}</div>
                        <div>{email}</div>
                        <div className="text-xs">{nextAuthId}</div>
                        <h4>Stats</h4>
                        <div>Wins: {wins}</div>
                        <div>Losses: {losses}</div>
                    </>
                )}
                <button onClick={() => signOut()} className="settings-buttons mt-8">
                    Sign Out
                </button>
            </div>
        </GenericModalBackground>
    )
}
