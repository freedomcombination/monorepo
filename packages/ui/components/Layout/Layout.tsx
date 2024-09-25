import { FC } from 'react'

import { Box, Center, Flex, Spinner } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

import { useAuthContext } from '@fc/context/auth'

import { LayoutProps } from './types'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'

export const Layout: FC<LayoutProps> = ({
  children,
  footerProps,
  hasProfile,
  headerProps,
  isDark,
  isLoading = false,
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
        {isLoading ? (
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
