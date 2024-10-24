import { StackProps } from '@chakra-ui/react'

import type { MenuType } from '@fc/types'

export type HeaderMenu = Array<MenuType>

export type ProfileMenuProps = Pick<HeaderProps, 'isDark' | 'isLoggedIn'> & {
  isMobile?: boolean
}

export interface HeaderProps {
  hasProfile?: boolean
  headerMenu: HeaderMenu
  isDark?: boolean
  isLoggedIn?: boolean
  logo: string
}

export interface HeaderNavItemProps {
  item: MenuType
  isDark?: boolean
}

export type HeaderMobileNavItemProps = HeaderNavItemProps

export interface MenuTypeItemProps {
  item: MenuType
  isDark?: boolean
  isMobile?: boolean
}

export interface HeaderNavProps {
  direction: StackProps['direction']
  menu: HeaderMenu
  isDark?: boolean
}

export type HeaderMobileProps = HeaderProps

export type HeaderMobileNavProps = Pick<HeaderProps, 'headerMenu'>
