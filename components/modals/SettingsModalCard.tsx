import useGameSettings$ from '@/store/game_settings'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, useForm } from 'react-hook-form'
import { AiFillSignal } from 'react-icons/ai'
import { SiLetterboxd } from 'react-icons/si'
import { z } from 'zod'

const schema = z.object({
    min_chars: z.number().min(5).max(8),
    difficulty: z.string(),
})

type FormData = z.infer<typeof schema>

interface Props {
    onCloseSettingsModal: () => void
}

export default function SettingsModalContainer({ onCloseSettingsModal }: Props) {
    // NOTE: minChars is only used for display, the actual min chars to transfer to the store
    // is inside onFormSubmitted's data
    // const [minChars, setMinChars] = useState(5)
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({ resolver: zodResolver(schema) })

    const gameSettings$ = useGameSettings$((state) => state.gameSettings$)
    const changeNumChars$ = useGameSettings$((state) => state.changeNumChars$)
    const changeDifficulty$ = useGameSettings$((state) => state.changeDifficulty$)
    const resetGameSettings$ = useGameSettings$((state) => state.resetGameSettings$)

    function onFormSubmitted(data: FieldValues) {
        console.log(data)
    }

    return (
        <form
            onSubmit={handleSubmit(onFormSubmitted)}
            className="flex flex-col items-center justify-center h-80 w-[28rem] bg-white rounded-3xl p-10"
        >
            <div className="mb-4 mt-3 flex items-center w-full pb-2 border-b pt-2 border-t">
                <span className="w-8">
                    <SiLetterboxd />
                </span>
                <label htmlFor="min-chars" className="font-medium text-lg text-neutral-600">
                    Minimum Chars
                </label>
                <input
                    {...register('min_chars', { valueAsNumber: true })}
                    value={gameSettings$.num_chars}
                    // value={minChars}
                    onChange={(e) => changeNumChars$(parseInt(e.target.value))}
                    // onChange={(e) => setMinChars(parseInt(e.target.value))}
                    id="min_chars"
                    type="range"
                    min={5}
                    max={8}
                    className="ml-auto outline-none"
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
                    {...register('difficulty')}
                    id="difficulty"
                    className="ml-auto p-2 border-none rounded-md outline-none"
                    value={gameSettings$.difficulty}
                    onChange={(e) => changeDifficulty$(e.target.value)}
                >
                    <option selected>Medium</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="very_hard">Very Hard</option>
                </select>
            </div>

            <div className="mt-auto w-full flex justify-between">
                <button
                    onClick={() => onCloseSettingsModal()}
                    type="submit"
                    className="settings-buttons border-red-400"
                >
                    Close
                </button>
                <button
                    onClick={() => resetGameSettings$()}
                    type="reset"
                    className="settings-buttons"
                >
                    Reset
                </button>

                {/* Todo: Implement */}
                <button
                    onClick={() => console.log('save and restart')}
                    type="button"
                    className="settings-buttons"
                >
                    Save and Restart
                </button>
            </div>
        </form>
    )
}
