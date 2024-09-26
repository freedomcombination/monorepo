import { LoginStates } from './types'

export const getTitle = (action: LoginStates) => {
  switch (action) {
    case 'reset':
      return 'forgot-pass.reset-password'
    case 'register':
      return 'login.signup'
    case 'forgot-password':
      return 'login.forgot.title'
    default:
      return 'login.signin'
  }
}
