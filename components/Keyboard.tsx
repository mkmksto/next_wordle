import { useEffect } from 'react'
import useGameState$ from '@/store/game_state'

interface Props {
    onKeyboardUp: (key: string) => void
    onBackSpace: () => void
    onEnter: () => void
}

export default function Keyboard({ onKeyboardUp, onBackSpace, onEnter }: Props) {
    const allowInput$ = useGameState$((state) => state.allowInput$)
    const hasWon$ = useGameState$((state) => state.hasWon$)

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
            handleInput(e.key)
        }
        window.addEventListener('keyup', onKeyUp)

        return () => window.removeEventListener('keyup', onKeyUp)
    }, [allowInput$, hasWon$, onKeyboardUp, onBackSpace, onEnter])

    return <div className="w-[540px] h-48 rounded-[2.5rem] mt-6 shadow-lg"></div>
}
