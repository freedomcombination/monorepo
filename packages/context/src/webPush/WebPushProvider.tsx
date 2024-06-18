import { FC, PropsWithChildren, createContext, useContext } from 'react'

import { WebPushState } from './type'
import { useWebPush } from './useWebPush'

const initialWebPushState: WebPushState = {
  registration: null,
  subscription: null,
  isSubscribed: false,
  isSupported: false,
}

export const WebPushContext = createContext<WebPushState>(initialWebPushState)

type WebPushProviderProps = PropsWithChildren<{
  enable: boolean
}>

export const WebPushProvider: FC<WebPushProviderProps> = ({
  children,
  enable,
}) => {
  const webPushData = useWebPush(enable)

  return (
    <WebPushContext.Provider value={webPushData}>
      {children}
    </WebPushContext.Provider>
  )
}

export const useWebPushContext = () => {
  return useContext(WebPushContext)
}
