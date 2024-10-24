import { FC, PropsWithChildren, useEffect } from 'react'

import { NextSeoProps } from 'next-seo'

import { menus } from '@fc/config/menu'
import { socialLinks } from '@fc/config/socialLinks'
import { useAuthContext } from '@fc/context/auth'
import { Layout as AppLayout } from '@fc/ui/components/Layout'
import { UserFeedback } from '@fc/ui/components/UserFeedback'

interface LayoutProps extends PropsWithChildren {
  isDark?: boolean
  loading?: boolean
  seo: NextSeoProps
}

export const Layout: FC<LayoutProps> = ({ children, isDark, loading, seo }) => {
  const { checkAuth } = useAuthContext()

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AppLayout
        seo={seo}
        hasProfile
        headerProps={{
          headerMenu: menus.kunsthalte.headerMenu,
          isDark,
          logo: '/images/kunsthalte-logo.svg',
        }}
        footerProps={{
          name: 'Kunsthalte',
          menu: menus.kunsthalte.footerMenu,
          about: 'kunsthalte',
          socialItems: socialLinks.kunsthalte,
          logo: '/images/kunsthalte-logo.svg',
        }}
        isDark={isDark}
        loading={loading}
      >
        {children}
      </AppLayout>
      <UserFeedback />
    </>
  )
}
