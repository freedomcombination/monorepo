import { createContext } from 'react'

import { initialWebPushState } from './state'
import { WebPushState } from './type'

export const WebPushContext = createContext<WebPushState>(initialWebPushState)
