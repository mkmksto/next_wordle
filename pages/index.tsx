import MainScreen from '@/components/MainScreen'
import NavBar from '@/components/NavBar'
import SettingsModalContainer from '@/components/modals/SettingsModalContainer'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] })

export default function Home() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Head>
                <title>Create Next App</title>
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

            <main
                className={`${inter.className} grid grid-cols-[6rem_1fr] overflow-hidden h-screen w-screen"`}
            >
                <NavBar onSettingsClicked={() => setShowModal(true)} />
                <MainScreen />
            </main>
        </>
    )
}
