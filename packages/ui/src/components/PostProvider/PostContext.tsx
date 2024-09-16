import { createContext } from 'react'

import { initialPostContext } from './state'
import { PostContextType } from './types'

export const PostContext = createContext<PostContextType>(initialPostContext)
