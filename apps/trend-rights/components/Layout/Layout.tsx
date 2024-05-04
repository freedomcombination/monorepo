import { FC, PropsWithChildren, useEffect } from 'react'

import { NextSeoProps } from 'next-seo'

import { menus, socialLinks } from '@fc/config'
import { trendRightsWithProfile } from '@fc/config/src/menu/trend-rights'
import { useAuthContext } from '@fc/context'
import { Layout as AppLayout, UserFeedback, useScroll } from '@fc/ui'

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
  const { checkAuth, token: isLoggedIn } = useAuthContext()
  const isScrolled = useScroll()

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const menu = isLoggedIn ? trendRightsWithProfile : menus['trend-rights']

  return (
    <>
      <AppLayout
        seo={seo}
        headerProps={{
          headerMenu: menu.headerMenu,
          isDark,
          logo:
            isDark && !isScrolled
              ? '/images/trend-rights-logo-light.svg'
              : '/images/trend-rights-logo.svg',
        }}
        footerProps={{
          name: 'trend-rights',
          menu: menu.footerMenu,
          about: 'trend-rights',
          socialItems: socialLinks['trend-rights'],
          logo: '/images/trend-rights-logo-light.svg',
        }}
        isDark={isDark}
        isLoading={isLoading}
        hasProfile
      >
        {children}
      </AppLayout>
      <UserFeedback />
    </>
  )
}
