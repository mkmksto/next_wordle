import useGameState$ from '@/store/game_state'
import useModalState$ from '@/store/modal_states'

export default function useGameLost() {
    const setAllowInput$ = useGameState$((state) => state.setAllowInput$)
    const setWonState$ = useGameState$((state) => state.setWonState$)
    const setLoseState$ = useGameState$((state) => state.setLoseState$)
    const setGameLostModal$ = useModalState$((state) => state.setGameLostModal$)

    function setGameStateToLost() {
        setAllowInput$(false)
        setWonState$(false)
        setLoseState$(true)
        setGameLostModal$(true)
    }

    return { setGameStateToLost }
}
