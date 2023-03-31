import Keyboard from './Keyboard'
import WordleGrid from './WordleGrid'

export default function GameBox() {
    return (
        <div className={`flex flex-col items-center justify-center h-full w-full`}>
            <WordleGrid />
            <Keyboard />
        </div>
    )
}
