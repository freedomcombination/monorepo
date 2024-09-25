import type { Auth } from '@fc/types'
import 'iron-session'

declare module 'iron-session' {
  interface IronSessionData extends Auth {}
}
