import { FC, PropsWithChildren } from 'react'

import { useWebPush } from './useWebPush'
import { WebPushContext } from './WebPushContext'

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
