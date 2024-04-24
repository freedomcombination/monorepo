import { ReactNode } from 'react'

import { ButtonProps } from '@chakra-ui/react'

import { AdminRoute } from '@fc/config'

export type NavItemWithSubmenuProps = {
  label: string
  link: AdminRoute
  icon: JSX.Element
  submenu?: NavItemWithSubmenuProps[]
}

export type NavItemWithoutSubmenuProps = {
  label: string
  link?: AdminRoute
  icon: JSX.Element
  submenu?: NavItemWithSubmenuProps[]
}

export type NavItemProps = NavItemWithSubmenuProps | NavItemWithoutSubmenuProps

export type AdminNavProps = {
  mobile?: boolean
}

export type AdminNavItemProps = {
  label: string
  link?: AdminRoute
  submenu?: AdminNavItemProps[]
  icon: JSX.Element
  mobile?: boolean
  allowed?: boolean
} & ButtonProps

export type NavLinkProps = ButtonProps & {
  href?: AdminRoute
  children?: ReactNode
}
