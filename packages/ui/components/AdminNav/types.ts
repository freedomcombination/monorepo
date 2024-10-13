import { ButtonProps } from '@chakra-ui/react'
import { LinkProps } from 'next/link'

import { DashboardRoute } from '@fc/config/dashboardRoutes'

export type NavItemWithSubmenuProps = {
  label: string
  link: DashboardRoute
  icon: JSX.Element
  submenu?: NavItemWithSubmenuProps[]
}

export type NavItemWithoutSubmenuProps = {
  label: string
  link?: DashboardRoute
  icon: JSX.Element
  submenu?: NavItemWithSubmenuProps[]
}

export type NavItemProps = NavItemWithSubmenuProps | NavItemWithoutSubmenuProps

export type AdminNavProps = {
  mobile?: boolean
}

export type AdminNavItemProps = {
  label: string
  link?: DashboardRoute
  submenu?: AdminNavItemProps[]
  icon: JSX.Element
  mobile?: boolean
  allowed?: boolean
} & ButtonProps

export type NavLinkProps = ButtonProps &
  Omit<LinkProps, 'href'> & {
    href?: DashboardRoute
  }
