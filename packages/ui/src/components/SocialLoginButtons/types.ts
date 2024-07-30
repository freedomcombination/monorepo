import { ReactElement } from 'react'

import { ButtonGroupProps, ThemeTypings } from '@chakra-ui/react'

export type SocialProviderName = 'google' | 'facebook' | 'twitter' | 'instagram'

export type SocialProvider = {
  name: Capitalize<SocialProviderName>
  icon: ReactElement
  url: `/api/connect/${SocialProviderName}`
  colorSchema: ThemeTypings['colorPalettes']
}

export type SocialLoginButtonsProps = ButtonGroupProps & {
  providersToBeShown?: SocialProviderName[]
}
