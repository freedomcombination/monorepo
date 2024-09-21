import { FC, PropsWithChildren, useEffect } from 'react'

import { NextSeoProps } from 'next-seo'

import { menus } from '@fc/config/menu'
import { trendRightsWithProfile } from '@fc/config/menu/trend-rights'
import { socialLinks } from '@fc/config/socialLinks'
import { useAuthContext } from '@fc/context/auth'
import { Layout as AppLayout } from '@fc/ui/components/Layout'
import { UserFeedback } from '@fc/ui/components/UserFeedback'
import { useScroll } from '@fc/ui/hooks/useScroll'

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
