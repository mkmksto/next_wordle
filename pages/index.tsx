import Head from 'next/head'
import { Inter, Space_Grotesk } from 'next/font/google'
import NavBar from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '700'] })

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
            <main className={`${inter.variable} font-sans`}>
                <NavBar />
            </main>
        </>
    )
}
