import { ReactNode } from 'react'

import { NextSeoProps } from 'next-seo'

import { FooterProps } from '../Footer/types'
import { HeaderProps } from '../Header/types'

export type LayoutProps = {
  children: ReactNode
  footerProps: FooterProps
  hasProfile?: boolean
  headerProps: HeaderProps
  isDark?: boolean
  isLoading?: boolean
  seo: NextSeoProps
}
