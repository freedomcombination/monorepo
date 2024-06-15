import { WebPushSubscription } from '@fc/types'

export type WebPushState = {
  registration: ServiceWorkerRegistration | null
  subscription: WebPushSubscription | null
  isSubscribed: boolean
  isSupported: boolean
}
