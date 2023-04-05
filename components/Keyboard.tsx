import { useEffect } from 'react'
import useGameState$ from '@/store/game_state'
import useRandomWordStore$ from '@/store/random_word'

interface Props {
    onKeyboardUp: (key: string) => void
    onBackSpace: () => void
    onEnter: () => void
}

export default function Keyboard({ onKeyboardUp, onBackSpace, onEnter }: Props) {
    const allowInput$ = useGameState$((state) => state.allowInput$)
    const hasWon$ = useGameState$((state) => state.hasWon$)

    const currentRandomWord$ = useRandomWordStore$((state) => state.currentRandomWord$)

    useEffect(() => {
        function handleInput(key: string) {
            if (hasWon$ || !allowInput$) return
            if (/^[a-zA-Z]$/.test(key)) {
                onKeyboardUp(key)
            } else if (key === 'Backspace' || key === '{bksp}') {
                onBackSpace()
            } else if (key === 'Enter' || key === '{enter}') {
                onEnter()
            }
        }

        function onKeyUp(e: KeyboardEvent) {
            e.preventDefault()
            if (!currentRandomWord$) return
            handleInput(e.key)
        }
        window.addEventListener('keyup', onKeyUp)

        return () => window.removeEventListener('keyup', onKeyUp)
    }, [allowInput$, hasWon$, onKeyboardUp, onBackSpace, onEnter, currentRandomWord$])

    return (
        <div className="w-[540px] h-48 rounded-[2.5rem] mt-6 shadow-lg shadow-orange-400/30"></div>
    )
}
