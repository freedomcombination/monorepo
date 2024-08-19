import { ReactElement } from 'react'

import { GroupProps, ButtonProps } from '@chakra-ui/react'

export type SocialProviderName = 'google' | 'facebook' | 'twitter' | 'instagram'

export type SocialProvider = {
  name: Capitalize<SocialProviderName>
  icon: ReactElement
  url: `/api/connect/${SocialProviderName}`
  colorSchema: ButtonProps['colorScheme']
}

export type SocialLoginButtonsProps = GroupProps & {
  providersToBeShown?: SocialProviderName[]
}
