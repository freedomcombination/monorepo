import { ForgotPasswordForm } from '../ForgotPasswordForm'
import { LoginForm } from '../LoginForm'
import { ResetPasswordForm } from '../ResetPasswordForm'
import { SignupForm } from '../SignupForm'

export type LoginStates = 'login' | 'register' | 'reset' | 'forgot-password'

export const AuthActionForm = ({ action }: { action: LoginStates }) => {
  switch (action) {
    case 'forgot-password':
      return <ForgotPasswordForm />
    case 'reset':
      return <ResetPasswordForm />
    case 'register':
      return <SignupForm providersToBeShown={[]} />
    default:
      return <LoginForm providersToBeShown={[]} />
  }
}

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
