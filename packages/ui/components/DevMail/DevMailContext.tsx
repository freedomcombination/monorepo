import { createContext } from 'react'

import { DevMailContextType } from './types'

export const DevMailContext = createContext<DevMailContextType>(
  {} as DevMailContextType,
)
