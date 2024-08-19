import type { MenuRootProps } from '@chakra-ui/react'
import {
  HiMiniEllipsisHorizontal,
  HiMiniEllipsisVertical,
} from 'react-icons/hi2'

import { IconButton, ButtonProps } from '@fc/chakra'

import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from './Menu'

export type OverflowMenuRootProps = MenuRootProps

export const OverflowMenuRoot = (props: OverflowMenuRootProps) => {
  return (
    <MenuRoot
      {...props}
      positioning={{ placement: 'bottom-end', ...props.positioning }}
    />
  )
}

export interface OverflowMenuTriggerProps extends ButtonProps {
  vertical?: boolean
}

export const OverflowMenuTrigger = (props: OverflowMenuTriggerProps) => {
  const { vertical, ...rest } = props

  return (
    <MenuTrigger asChild>
      <IconButton
        variant="plain"
        size="sm"
        {...rest}
        icon={
          vertical ? <HiMiniEllipsisVertical /> : <HiMiniEllipsisHorizontal />
        }
      />
    </MenuTrigger>
  )
}

export const OverflowMenuItem = MenuItem
export const OverflowMenuContent = MenuContent
