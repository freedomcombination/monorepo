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
