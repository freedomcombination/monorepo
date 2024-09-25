import { WebPushState } from './type'

export const initialWebPushState: WebPushState = {
  registration: null,
  subscription: null,
  isSubscribed: false,
  isSupported: false,
}
