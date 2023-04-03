import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'

const middleware = (f: (set: any, get: any) => void) => immer(devtools(f))

export default middleware
