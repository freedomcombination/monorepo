import { createContext } from 'react'

import { initialAuthState } from './state'
import { AuthContextType } from './types'

export const AuthContext = createContext<AuthContextType>(initialAuthState)
