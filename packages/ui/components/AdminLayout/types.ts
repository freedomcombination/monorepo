import { ReactNode } from 'react'

import { NextSeoProps } from 'next-seo'

export type AdminLayoutProps = {
  children: ReactNode
  loading?: boolean
  hasBackButton?: boolean
  seo: NextSeoProps
}
