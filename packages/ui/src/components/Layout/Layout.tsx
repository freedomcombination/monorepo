import { FC, ReactNode } from 'react'

import { Box, Center, Flex, Spinner } from '@chakra-ui/react'
import { NextSeo, NextSeoProps } from 'next-seo'

import { useAuthContext } from '@fc/context'

import { Footer } from '../Footer/Footer'
import { FooterProps } from '../Footer/types'
import { Header } from '../Header/Header'
import { HeaderProps } from '../Header/types'

export interface LayoutProps {
  children: ReactNode
  footerProps: FooterProps
  hasProfile?: boolean
  headerProps: HeaderProps
  isDark?: boolean
  loading?: boolean
  seo: NextSeoProps
}

export const Layout: FC<LayoutProps> = ({
  children,
  footerProps,
  hasProfile,
  headerProps,
  isDark,
  loading = false,
  seo,
}) => {
  const minH = isDark
    ? 'calc(100vh - 300px)'
    : { base: 'calc(100vh - 64px)', lg: 'calc(100vh - 100px)' }

  const { user } = useAuthContext()

  return (
    <>
      {seo && <NextSeo {...seo} />}
      <Flex flexDir="column" minHeight="100vh" overflowX="hidden">
        <Header
          {...headerProps}
          isLoggedIn={!!user}
          isDark={isDark}
          hasProfile={hasProfile}
        />
        {loading ? (
          <Center minH={minH}>
            <Spinner colorScheme="red" />
          </Center>
        ) : (
          <Box minH={minH}>{children}</Box>
        )}
        <Footer {...footerProps} />
      </Flex>
    </>
  )
}
