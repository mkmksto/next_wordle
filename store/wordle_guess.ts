import { allowed_guesses } from '@/data/allowed_guesses'
import my_fetch from '@/services/my_fetch'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import middleware from './zustand_middleware'

export interface LetterGuess {
    id: string
    letter: string
    isBlank: boolean
    isLetterInWord: boolean
    isLetterInCorrectPosition: boolean
    colorRevealValue: string
}

interface IGuessStore {
    currentRandomWord$: string
    setCurrentRandomWord$: (curWord: string) => void
    allGuesses$: LetterGuess[][]
    currentRowIdx$: number
    resetGuessTrackingStore$: () => void
    changeNumBoxesPerRow$: (gameSettingsNumChars: number) => void
    incrementRow$: () => void
    currentRow$: () => LetterGuess[]
    isCurrentRowTheLastRow$: () => boolean
    currentGuessArr$: () => LetterGuess[]
    currentFlattenedGuess$: () => string
    addLetterToGuess$: (letterToAdd: string) => void
    removeLastLetterFromGuess$: () => void
    isCurrentRowFilled$: () => boolean
    isGuessValid$: (cur_word_difficulty: string) => Promise<boolean>
    isAllRowsFilled$: () => boolean
    isGuessCorrect$: () => boolean
    setValidityOfEachLetterInGuess$: () => void
    setColorRevealValue$: (uuid: string, colorRevealClass: string) => void
}

const guessStore = (set: any, get: any) => ({
    currentRandomWord$: '',

    setCurrentRandomWord$: (curWord: string): void => {
        set((state: IGuessStore) => {
            state.currentRandomWord$ = curWord.toLowerCase()
        })
    },

    allGuesses$: generateEmptyGuessArray(5),

    currentRowIdx$: 0,

    resetGuessTrackingStore$: (): void =>
        set((state: IGuessStore) => {
            state.currentRandomWord$ = ''
            state.currentRowIdx$ = 0
        }),

    changeNumBoxesPerRow$: (gameSettingsNumChars: number): void =>
        set((state: IGuessStore) => {
            state.allGuesses$ = generateEmptyGuessArray(gameSettingsNumChars)
        }),

    incrementRow$: (): void =>
        set((state: IGuessStore) => {
            state.currentRowIdx$++
        }),

    // get currentRow$() {
    //     return get().allGuesses$[get().currentRowIdx$]
    // },
    currentRow$: (): LetterGuess[] => get().allGuesses$[get().currentRowIdx$],

    isCurrentRowTheLastRow$(): boolean {
        return get().currentRowIdx$ === get().allGuesses$.length - 1
    },

    currentGuessArr$: (): LetterGuess[] =>
        get()
            .currentRow$()
            .filter((l: LetterGuess) => !l.isBlank),

    currentFlattenedGuess$: (): string =>
        get()
            .currentRow$()
            .filter((l: LetterGuess) => !l.isBlank)
            .map((l: LetterGuess) => l.letter)
            .reduce((acc: string, l: LetterGuess) => acc + l, ''),

    addLetterToGuess$: (letterToAdd: string): void => {
        const current = (): LetterGuess[] => get().currentRow$()
        const currentRow: LetterGuess[] = JSON.parse(JSON.stringify(current()))
        const nextBlankCell = currentRow.find((letter) => letter.isBlank) as LetterGuess

        if (!nextBlankCell) return
        nextBlankCell.letter = letterToAdd
        nextBlankCell.isBlank = false

        set((state: IGuessStore) => {
            const newState: LetterGuess[][] = JSON.parse(JSON.stringify(state.allGuesses$))
            newState.splice(state.currentRowIdx$, 1, currentRow)
            state.allGuesses$ = newState
        })
    },

    removeLastLetterFromGuess$: (): void => {
        const current = (): LetterGuess[] => get().currentRow$()
        const currentRow: LetterGuess[] = JSON.parse(JSON.stringify(current()))
        const itemToRemove = [...currentRow]
            .reverse()
            .find((letter) => !letter.isBlank) as LetterGuess
        if (!itemToRemove) return
        itemToRemove.letter = ''
        itemToRemove.isBlank = true
        itemToRemove.isLetterInWord = false
        itemToRemove.isLetterInCorrectPosition = false

        set((state: IGuessStore) => {
            const newState: LetterGuess[][] = JSON.parse(JSON.stringify(state.allGuesses$))
            newState.splice(state.currentRowIdx$, 1, currentRow)
            state.allGuesses$ = newState
        })
    },

    isCurrentRowFilled$: (): boolean =>
        get().currentRandomWord$.length === get().currentFlattenedGuess$().length,

    async isGuessValid$(cur_word_difficulty: string): Promise<boolean> {
        if (allowed_guesses.includes(get().currentFlattenedGuess$())) return true
        if (
            await getGuessValidityBasedOnFrequency(
                get().currentFlattenedGuess$(),
                cur_word_difficulty,
            )
        )
            return true

        return false
    },

    isAllRowsFilled$(): boolean {
        return get().allGuesses$.every((row: LetterGuess[]) =>
            row.every((letter) => !letter.isBlank),
        )
    },

    isGuessCorrect$(): boolean {
        if (get().currentRandomWord$ === get().currentFlattenedGuess$()) return true
        return false
    },

    setValidityOfEachLetterInGuess$(): void {
        const guessLetterPool: string[] = []
        const curRandWord: string = get().currentRandomWord$
        const validLetters: string[] = curRandWord.split('')
        const mutatedCurGuessObj: LetterGuess[] = JSON.parse(
            JSON.stringify(get().currentGuessArr$()),
        )

        for (let i = 0; i < curRandWord.length; i++) {
            // letter is an exact match at the exact index
            if (mutatedCurGuessObj[i].letter === curRandWord[i]) {
                mutatedCurGuessObj[i].isLetterInCorrectPosition = true
                // push empty char so that the indices for comparison still match
                guessLetterPool.push(' ')

                // if exact match, remove letter from validLetters for comparison
                // this is to prevent cases like e.g. the word is `ellis` and typing `eager`
                // would make the first `e` green, but would still make
                // the second `e` yellow (should be grey)
                const idxAtvalidLettersArr = validLetters.indexOf(curRandWord[i])
                validLetters.splice(idxAtvalidLettersArr, 1)
            } else {
                // if not an exact match, throw into pool for later comparison
                guessLetterPool.push(mutatedCurGuessObj[i].letter)
            }
        }

        for (let i = 0; i < curRandWord.length; i++) {
            if (validLetters.includes(guessLetterPool[i])) {
                mutatedCurGuessObj[i].isLetterInWord = true
            }
        }

        // set new state
        set((state: IGuessStore) => {
            const newState: LetterGuess[][] = JSON.parse(JSON.stringify(state.allGuesses$))
            newState.splice(state.currentRowIdx$, 1, mutatedCurGuessObj)
            state.allGuesses$ = newState
        })
    },

    setColorRevealValue$: (uuid: string, colorRevealClass: string): void => {
        const mutatedCurGuessObj: LetterGuess[] = JSON.parse(
            JSON.stringify(get().currentGuessArr$()),
        )
        const letter = mutatedCurGuessObj.find((l) => l.id === uuid)
        if (!letter) return
        letter.colorRevealValue = colorRevealClass
        set((state: IGuessStore) => {
            const newState: LetterGuess[][] = JSON.parse(JSON.stringify(state.allGuesses$))
            newState.splice(state.currentRowIdx$, 1, mutatedCurGuessObj)
            state.allGuesses$ = newState
        })
    },
})

const useGuessTracker$ = create<IGuessStore>()(middleware(guessStore))
export default useGuessTracker$

async function getGuessValidityBasedOnFrequency(
    word_to_test: string,
    cur_word_difficulty: string,
) {
    const [validity, error] = await my_fetch('/api/test_if_guess_is_valid', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            word_to_test: word_to_test,
            cur_word_difficulty: cur_word_difficulty,
        }),
    })

    if (error) return false
    return validity.validity
}

function generateEmptyGuessArray(wordSize: number): LetterGuess[][] {
    const finalArr: LetterGuess[][] = []
    for (let i = 0; i < 6; i++) {
        const nestedArr: LetterGuess[] = []
        for (let i = 0; i < wordSize; i++) {
            nestedArr.push({
                id: uuidv4(),
                letter: '',
                isBlank: true,
                isLetterInWord: false,
                isLetterInCorrectPosition: false,
                colorRevealValue: '',
            })
        }
        finalArr.push(nestedArr)
    }
    return finalArr
}
