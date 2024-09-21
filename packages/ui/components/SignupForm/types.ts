import { SocialLoginButtonsProps } from '../SocialLoginButtons'

export type SignupFormFieldValues = {
  email: string
  password: string
  username: string
  name: string
}

export type SignupFormProps = Pick<
  SocialLoginButtonsProps,
  'providersToBeShown'
>
