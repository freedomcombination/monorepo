import { ReactElement } from 'react'

import { ButtonProps } from '../Button'

export type SocialProviderName = 'google' | 'facebook' | 'twitter' | 'instagram'

export type SocialProvider = {
  name: Capitalize<SocialProviderName>
  icon: ReactElement
  url: `/api/connect/${SocialProviderName}`
  colorPalette: ButtonProps['colorPalette']
}

export type SocialLoginButtonsProps = ButtonProps & {
  providersToBeShown?: SocialProviderName[]
}
