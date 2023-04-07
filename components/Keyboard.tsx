import useGameState$ from '@/store/game_state'
import useKeyboardColors$ from '@/store/keyboard_colors'
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
    const yellowKeys$ = useKeyboardColors$((state) => state.yellowKeys$)
    const greyKeys$ = useKeyboardColors$((state) => state.greyKeys$)
    const greenKeys$ = useKeyboardColors$((state) => state.greenKeys$)

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

    // resouce for coloring the buttons:
    // https://hodgef.com/simple-keyboard/editor/?d=hodgef/react-simple-keyboard-demos/tree/uc-customization
    return (
        <div className="w-[570px] mt-12 rounded-3xl">
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
                buttonTheme={[
                    {
                        class: 'key-neutral',
                        buttons: `${greyKeys$}`,
                    },
                    {
                        class: 'key-yellow',
                        buttons: `${yellowKeys$}`,
                    },
                    {
                        class: 'key-green',
                        buttons: `${greenKeys$}`,
                    },
                ]}
            />
        </div>
    )
}
