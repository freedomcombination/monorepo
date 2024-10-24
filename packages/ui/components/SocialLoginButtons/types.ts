import { ReactElement } from 'react'

import { GroupProps } from '@chakra-ui/react'

import { ButtonProps } from '@fc/chakra'

export type SocialProviderName = 'google' | 'facebook' | 'twitter' | 'instagram'

export type SocialProvider = {
  name: Capitalize<SocialProviderName>
  icon: ReactElement
  url: `/api/connect/${SocialProviderName}`
  colorSchema: ButtonProps['colorPalette']
}

export type SocialLoginButtonsProps = GroupProps &
  ButtonProps & {
    providersToBeShown?: SocialProviderName[]
  }
