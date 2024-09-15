import { createContext } from 'react'

import { initialHashtagContext } from './state'
import { HashtagContextType } from './types'

export const HashtagContext = createContext<HashtagContextType>(
  initialHashtagContext,
)
