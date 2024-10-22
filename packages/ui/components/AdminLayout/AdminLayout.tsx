import { FC, useEffect, useMemo } from 'react'

import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Flex,
  Spinner,
  Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'

import { useAuthContext } from '@fc/context/auth'

import { AdminLayoutProps } from './types'
import { AdminHeader } from '../AdminHeader'
import { useAdminNav } from '../AdminNav/useAdminNav'
import { AdminSidebar } from '../AdminSidebar'
import { AuthModal } from '../AuthModal'

const NotAllowedPage: FC<{ show?: boolean }> = ({ show }) => {
  const { t } = useTranslation()

  if (!show) return null

  return (
    <Center h={'full'}>
      <Alert
        status="error"
        variant="solid"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="80%"
        width="80%"
        borderRadius="lg"
      >
        <AlertIcon boxSize="80px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          {t('not-allowed')}
        </AlertTitle>
      </Alert>
    </Center>
  )
}

export const AdminLayout: FC<AdminLayoutProps> = ({
  children,
  isLoading,
  hasBackButton,
  seo,
}) => {
  const { checkAuth, isLoading: isAuthLoading, isAdmin } = useAuthContext()

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { navItems, hasPathPermission } = useAdminNav()
  const { asPath } = useRouter()

  const isPathAllowed = useMemo(() => {
    return hasPathPermission(asPath)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navItems, asPath])

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
          overflowY={'hidden'}
          flex={1}
          //    pb={{ base: 12, lg: 4 }}
        >
          {isLoading ? (
            <Center h="full">
              <Spinner size="xl" />
            </Center>
          ) : (
            <>
              <AdminHeader
                hasBackButton={hasBackButton}
                title={
                  !isPathAllowed
                    ? isAdmin
                      ? 'Not allowed * ' + seo.title
                      : '***'
                    : seo.title
                }
              />
              {!isPathAllowed && !isAdmin ? (
                <NotAllowedPage show={!isAuthLoading && navItems.length > 0} />
              ) : (
                <Stack
                  px={4}
                  h={'full'}
                  flex={1}
                  spacing={4}
                  overflowY={'auto'}
                >
                  {/* Page Content */}
                  {children}
                </Stack>
              )}
            </>
          )}
        </Stack>
      </Flex>
    </>
  )
}
