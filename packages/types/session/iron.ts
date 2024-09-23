import 'iron-session'
import { Auth } from '.'

declare module 'iron-session' {
  type IronSessionData = Auth
}
