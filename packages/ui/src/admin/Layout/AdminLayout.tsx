import { FC, ReactNode, useEffect } from 'react'

import { Box, Center, Flex, Spinner, Stack } from '@chakra-ui/react'
import { NextSeo, NextSeoProps } from 'next-seo'

import { useAuthContext } from '@fc/context'

import { AdminHeader } from '../AdminHeader'
import { AdminSidebar } from '../AdminSidebar'
import { AuthModal } from '../AuthModal'

export type AdminLayoutProps = {
  children: ReactNode
  isLoading?: boolean
  hasBackButton?: boolean
  seo: NextSeoProps
}

export const AdminLayout: FC<AdminLayoutProps> = ({
  children,
  isLoading,
  hasBackButton,
  seo,
}) => {
  const { checkAuth } = useAuthContext()

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NextSeo {...seo} />
      <AuthModal />
      <Flex h={'full'} pos={'relative'}>
        {/* Sidebar */}
        <Box top={0} left={0} h="full" overflowY={'auto'} zIndex={1}>
          <AdminSidebar />
        </Box>

        <Stack
          spacing={0}
          as="main"
          bg="gray.50"
          h="full"
          overflowY={'auto'}
          flex={1}
          pb={{ base: 12, lg: 4 }}
        >
          {isLoading ? (
            <Center h="full">
              <Spinner size="xl" />
            </Center>
          ) : (
            <>
              <AdminHeader hasBackButton={hasBackButton} title={seo.title} />
              {/* Page Content */}
              <Stack px={4} h={'full'} flex={1} spacing={4} overflowY={'auto'}>
                {children}
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </>
  )
}
