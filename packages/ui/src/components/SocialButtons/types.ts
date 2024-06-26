import { IconButtonProps } from '@chakra-ui/react'
import { Localize } from '@fc/types'
import { IconType } from 'react-icons'

export type SocialItem = {
  label: string
  icon: IconType
  link: Localize<string> | string
}

export type SocialButtonsProps = Omit<IconButtonProps, 'aria-label'> & {
  items: SocialItem[]
}
