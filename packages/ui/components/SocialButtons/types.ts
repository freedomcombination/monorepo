import { IconType } from 'react-icons'

import { IconButtonProps } from '@fc/chakra'
import type { Localize } from '@fc/types'

export type SocialItem = {
  label: string
  icon: IconType
  link: Localize<string> | string
}

export type SocialButtonsProps = Omit<
  IconButtonProps,
  'aria-label' | 'icon'
> & {
  items: SocialItem[]
}
