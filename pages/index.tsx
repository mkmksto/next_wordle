import MainScreen from '@/components/MainScreen'
import NavBar from '@/components/NavBar'
import GameLostModal from '@/components/modals/GameLostModal'
import GameWonModal from '@/components/modals/GameWonModal'
import GenericErrorModal from '@/components/modals/GenericErrorModal'
import InfoModal from '@/components/modals/InfoModal'
import InvalidGuessModal from '@/components/modals/InvalidGuessModal'
import ProfileModal from '@/components/modals/ProfileModal'
import SettingsModalContainer from '@/components/modals/SettingsModalContainer'
import useRandomWordFetch from '@/hooks/useRandomWordFetch'
import useGameSettings$ from '@/store/game_settings'
import useModalState$ from '@/store/modal_states'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] })

export default function Home() {
    const [showModal, setShowModal] = useState(false)
    const gameSettings$ = useGameSettings$((state) => state.gameSettings$)
    useRandomWordFetch(gameSettings$)
    const showProfileModal$ = useModalState$((state) => state.showProfileModal$)
    // const { data: session, status } = useSession()
    // const authenticated = session && status === 'authenticated'

    return (
        <>
            <Head>
                <title>My Wordle App (NEXT JS)</title>
                <meta
                    name="description"
                    content="Worlde game created using NEXT JS and Typescript"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SettingsModalContainer
                showModal={showModal}
                onModalBgClicked={() => setShowModal(false)}
                onCloseSettingsModal={() => setShowModal(false)}
            />

            <InfoModal />

            {!!showProfileModal$ && <ProfileModal />}

            <InvalidGuessModal />

            <GameWonModal />

            <GameLostModal />

            <GenericErrorModal errorMessage="An error has occured, try restarting the game" />

            <main
                className={`${inter.className} grid grid-cols-[5rem_1fr] overflow-hidden h-screen w-screen"`}
            >
                <NavBar onSettingsClicked={() => setShowModal(true)} />
                <MainScreen />
            </main>
        </>
    )
}
