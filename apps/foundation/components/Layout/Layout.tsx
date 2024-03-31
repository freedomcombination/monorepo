import { FC, PropsWithChildren, useEffect } from 'react'

import { NextSeoProps } from 'next-seo'

import { menus, socialLinks } from '@fc/config'
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
        isLoading={isLoading}
        hasProfile
      >
        {children}
      </AppLayout>
      <UserFeedback />
    </>
  )
}
