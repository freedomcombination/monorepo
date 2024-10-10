import type { Auth } from '@fc/types'
import 'iron-session'

declare module 'iron-session' {
  type IronSessionData = Auth
}
