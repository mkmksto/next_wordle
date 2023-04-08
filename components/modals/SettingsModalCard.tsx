// import useResetGame from '@/hooks/useResetGame'
import useGameSettings$ from '@/store/game_settings'
import useResetSwitch$ from '@/store/reset_switch'
import { AiFillSignal } from 'react-icons/ai'
import { SiLetterboxd } from 'react-icons/si'

interface Props {
    onCloseSettingsModal: () => void
}

export default function SettingsModalContainer({ onCloseSettingsModal }: Props) {
    const gameSettings$ = useGameSettings$((state) => state.gameSettings$)
    const changeNumChars$ = useGameSettings$((state) => state.changeNumChars$)
    const changeDifficulty$ = useGameSettings$((state) => state.changeDifficulty$)
    const resetGameSettings$ = useGameSettings$((state) => state.resetGameSettings$)

    // const { handleReset } = useResetGame()
    const resetState$ = useResetSwitch$((state) => state.resetState$)
    const setResetState$ = useResetSwitch$((state) => state.setResetState$)

    return (
        <form className="flex flex-col items-center justify-center h-80 min-w-[28rem] max-w-fit bg-white rounded-3xl p-10">
            <div className="mb-4 mt-3 flex items-center w-full pb-2 border-b pt-2 border-t">
                <span className="w-8">
                    <SiLetterboxd />
                </span>
                <label htmlFor="min-chars" className="font-medium text-lg text-neutral-600">
                    Minimum Chars
                </label>
                <input
                    value={gameSettings$.num_chars}
                    onChange={(e) => changeNumChars$(parseInt(e.target.value))}
                    id="min_chars"
                    type="range"
                    min={5}
                    max={8}
                    className="ml-auto outline-none accent-orange-400 bg-neutral-100"
                />
                <span className="ml-2">{gameSettings$.num_chars}</span>
            </div>

            <div className="mb-3 flex items-center w-full pb-2 border-b">
                <span className="w-8">
                    <AiFillSignal />
                </span>
                <label
                    htmlFor="difficulty"
                    className="font-medium text-lg text-neutral-600 flex items-center"
                >
                    Difficulty
                </label>
                <select
                    id="difficulty"
                    name="difficulty"
                    className="ml-auto p-2 border-none rounded-full"
                    value={gameSettings$.difficulty}
                    onChange={(e) => changeDifficulty$(e.target.value)}
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="very_hard">Very Hard</option>
                </select>
            </div>

            <div className="mt-auto w-full flex justify-between gap-x-3">
                <button
                    onClick={() => onCloseSettingsModal()}
                    type="submit"
                    className="settings-buttons border-orange-300"
                >
                    Close
                </button>
                <button
                    onClick={() => resetGameSettings$()}
                    type="reset"
                    className="settings-buttons"
                >
                    Reset Settings
                </button>

                {/* Todo: Implement */}
                <button
                    onClick={() => {
                        onCloseSettingsModal()
                        setResetState$(!resetState$)
                        // handleReset()
                    }}
                    type="button"
                    className="settings-buttons"
                >
                    Save and Restart
                </button>
            </div>
        </form>
    )
}
