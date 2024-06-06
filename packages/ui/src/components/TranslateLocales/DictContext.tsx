import { createContext } from 'react'

import { DictContextProps } from './types'

export const DictContext = createContext<DictContextProps>(
  {} as DictContextProps,
)
