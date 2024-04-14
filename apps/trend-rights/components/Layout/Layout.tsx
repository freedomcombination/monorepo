import { FC, PropsWithChildren, useEffect } from 'react'

import { NextSeoProps } from 'next-seo'

import { menus, socialLinks } from '@fc/config'
import { news, tweets } from '@fc/config/src/menu/routes'
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

  let headerMenu = menus['trend-rights'].headerMenu
  const footerMenu = menus['trend-rights'].footerMenu

  if (isLoggedIn) {
    headerMenu = [news, tweets, ...headerMenu]
    footerMenu[0].children = [news, tweets, ...(footerMenu[0].children ?? [])]
  }

  return (
    <>
      <AppLayout
        seo={seo}
        headerProps={{
          headerMenu,
          isDark,
          logo:
            isDark && !isScrolled
              ? '/images/trend-rights-logo-light.svg'
              : '/images/trend-rights-logo.svg',
        }}
        footerProps={{
          name: 'trend-rights',
          menu: footerMenu,
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
