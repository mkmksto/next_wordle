import Head from 'next/head'
import { Inter, Space_Grotesk } from 'next/font/google'
import NavBar from '@/components/NavBar'
import MainScreen from '@/components/MainScreen'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] })

export default function Home() {
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
            <main
                className={`${inter.className} grid grid-cols-[6rem_1fr] overflow-hidden h-screen w-screen"`}
            >
                <NavBar />
                <MainScreen />
            </main>
        </>
    )
}
