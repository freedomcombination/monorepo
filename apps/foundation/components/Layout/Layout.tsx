import { FC, PropsWithChildren, useEffect } from 'react'

import { NextSeoProps } from 'next-seo'

import { menus } from '@fc/config/menu'
import { socialLinks } from '@fc/config/socialLinks'
import { useAuthContext } from '@fc/context/auth'
import { Layout as AppLayout } from '@fc/ui/components/Layout'
import { UserFeedback } from '@fc/ui/components/UserFeedback'
import { useScroll } from '@fc/ui/hooks/useScroll'

interface LayoutProps extends PropsWithChildren {
  isDark?: boolean
  loading?: boolean
  seo: NextSeoProps
}

export const Layout: FC<LayoutProps> = ({ children, isDark, loading, seo }) => {
  const { checkAuth } = useAuthContext()
  const isScrolled = useScroll()

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AppLayout
        seo={seo}
        headerProps={{
          headerMenu: menus.foundation.headerMenu,
          isDark,
          logo:
            isDark && !isScrolled
              ? '/images/foundation-logo-light.svg'
              : `/images/foundation-logo.svg`,
        }}
        footerProps={{
          menu: menus.foundation.footerMenu,
          name: 'Freedom Combination',
          about: 'foundation',
          socialItems: socialLinks.foundation,
          logo: `/images/foundation-logo-light.svg`,
        }}
        isDark={isDark}
        loading={loading}
        hasProfile
      >
        {children}
      </AppLayout>
      <UserFeedback />
    </>
  )
}
