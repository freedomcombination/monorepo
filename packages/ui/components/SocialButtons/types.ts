import { IconButtonProps } from '@chakra-ui/react'
import { IconType } from 'react-icons'

import type { Localize } from '@fc/types'

export type SocialItem = {
  label: string
  icon: IconType
  link: Localize<string> | string
}

export type SocialButtonsProps = Omit<IconButtonProps, 'aria-label'> & {
  items: SocialItem[]
}
