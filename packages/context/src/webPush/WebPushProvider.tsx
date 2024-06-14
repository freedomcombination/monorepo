import { FC, PropsWithChildren, createContext, useContext } from 'react'

import { AppSlug } from '@fc/types'

import { WebPushState } from './type'
import { useWebPush } from './useWebPush'

const initialWebPushState: WebPushState = {
  registration: null,
  subscription: null,
  isSubscribed: false,
  site: null,
}

export const WebPushContext = createContext<WebPushState>(initialWebPushState)

type WebPushProviderProps = PropsWithChildren<{
  site: AppSlug
  enable: boolean
}>

export const WebPushProvider: FC<WebPushProviderProps> = ({
  children,
  site,
  enable: initialEnable,
}) => {
  const enable =
    initialEnable && process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === 'true'

  const webPushData = useWebPush(enable)

  const providerValue: WebPushState = {
    ...webPushData,
    site,
  }

  return (
    <WebPushContext.Provider value={providerValue}>
      {children}
    </WebPushContext.Provider>
  )
}

export const useWebPushContext = () => {
  return useContext(WebPushContext)
}
