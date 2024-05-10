import { FC } from 'react'

import { Box, Divider, HStack, Stack, Text } from '@chakra-ui/react'

import { useAuthContext } from '@fc/context'

import { AdminSidebarProfile } from './AdminSidebarProfile'
import { Navigate, WAvatar } from '../../components'
import { AdminNav } from '../AdminNav'

type AdminSidebarProps = {
  mobile?: boolean
}

export const AdminSidebar: FC<AdminSidebarProps> = ({ mobile }) => {
  const { user, profile, logout, demoPermissions } = useAuthContext()

  return (
    <Stack
      display={{ base: mobile ? 'flex' : 'none', md: 'flex' }}
      bg="white"
      py={4}
      spacing={0}
      h="100%"
      {...(!mobile && {
        shadow: 'base',
        w: 300,
      })}
      align={'stretch'}
    >
      {/* Logo */}
      <Navigate href="/">
        <HStack align="center" spacing={4} alignItems="center" justify="center">
          <WAvatar
            size={'lg'}
            src={`/images/foundation-logo.svg`}
            name="Freedom Combination"
          />

          <Text color={'blue.500'} fontWeight={700} fontSize="xl">
            Dashboard
          </Text>
        </HStack>
      </Navigate>
      {/* User */}
      {user && (
        <Box py={4}>
          <AdminSidebarProfile
            user={user}
            profile={profile}
            onLogout={logout}
          />
        </Box>
      )}

      {/* Menu */}
      <Box mt={2} flex={1} overflow="auto">
        <Stack>
          <Box pos="sticky" top={0} px={4} bg="white" zIndex={1}>
            <Text
              fontWeight={600}
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
            >
              MENU{' '}
              {demoPermissions && <Text color={'red.500'}>* Editing...</Text>}
            </Text>
          </Box>

          {/* AdminNav */}
          <AdminNav mobile={mobile} />
        </Stack>
      </Box>

      {/* Footer */}
      <Box>
        <Divider mb={4} />
        <Stack>
          <Text fontSize={'sm'} textAlign="center">
            Freedom Combination &copy;All Copyrights Reserved
          </Text>
        </Stack>
      </Box>
    </Stack>
  )
}
