import useGameState$ from '@/store/game_state'
import useRandomWordStore$ from '@/store/random_word'
import { useEffect } from 'react'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

interface Props {
    onKeyboardUp: (key: string) => void
    onBackSpace: () => void
    onEnter: () => void
}

export default function KeyboardComponent({ onKeyboardUp, onBackSpace, onEnter }: Props) {
    const allowInput$ = useGameState$((state) => state.allowInput$)
    const hasWon$ = useGameState$((state) => state.hasWon$)
    const currentRandomWord$ = useRandomWordStore$((state) => state.currentRandomWord$)

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

    useEffect(() => {
        function onKeyUp(e: KeyboardEvent) {
            e.preventDefault()
            if (!currentRandomWord$) return
            handleInput(e.key)
        }
        window.addEventListener('keyup', onKeyUp)

        return () => window.removeEventListener('keyup', onKeyUp)
    }, [allowInput$, hasWon$, onKeyboardUp, onBackSpace, onEnter, currentRandomWord$])

    return (
        <div className="w-[550px] mt-12 shadow-lg shadow-orange-400/30 rounded-3xl">
            {/* https://hodgef.com/simple-keyboard/questions-answers/edit-add-new-buttons-keyboard/ */}
            <Keyboard
                onChange={() => console.log('on keyboard change')}
                onKeyPress={(buttonPressed) => handleInput(buttonPressed)}
                layout={{
                    default: [
                        'q w e r t y u i o p',
                        'a s d f g h j k l',
                        '{enter} z x c v b n m {bksp}',
                    ],
                }}
                theme={'hg-theme-default hg-layout-default myTheme'}
            />
        </div>
    )
}
