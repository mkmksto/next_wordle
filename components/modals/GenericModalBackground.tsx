import { ReactNode, useRef } from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700'] })

interface Props {
    children: ReactNode
}

export default function GenericModalBackground({ children }: Props) {
    const modalBgRef = useRef<HTMLDivElement>(null)

    // if (!showModal) return null

    return (
        <div
            ref={modalBgRef}
            className={`fixed top-0 left-0 h-screen w-screen z-[100] flex items-center justify-center bg-black/50 ${inter.className}`}
        >
            {children}
        </div>
    )
}
