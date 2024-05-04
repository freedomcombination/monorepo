import { FC, PropsWithChildren, useEffect } from 'react'

import { NextSeoProps } from 'next-seo'

import { menus, socialLinks } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { Layout as AppLayout, UserFeedback } from '@fc/ui'

interface LayoutProps extends PropsWithChildren {
  isDark?: boolean
  isLoading?: boolean
  seo: NextSeoProps
}

export const Layout: FC<LayoutProps> = ({
  children,
  isDark,
  isLoading,
  seo,
}) => {
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
        isLoading={isLoading}
      >
        {children}
      </AppLayout>
      <UserFeedback />
    </>
  )
}
