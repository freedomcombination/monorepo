import { FC } from 'react'

import { Box, Separator, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'


import { useAuthContext } from '@fc/context'

import { AdminSidebarProfile } from './AdminSidebarProfile'
import { AdminSidebarProps } from './types'
import { AdminNav } from '../AdminNav'
import { WAvatar } from '../WAvatar'

export const AdminSidebar: FC<AdminSidebarProps> = ({ mobile }) => {
  const { user, profile, logout, demoPermissions } = useAuthContext()

  return (
    <Stack
      display={{ base: mobile ? 'flex' : 'none', md: 'flex' }}
      bg={'white'}
      py={4}
      // gap={0}
      h={'full'}
      {...(!mobile && {
        w: 300,
      })}
      align={'stretch'}
      separator={<Separator />}
    >
      {/* Logo */}
      <Link href="/">
        <HStack align="center" gap={4} alignItems="center" justify="center">
          <WAvatar
            size={'lg'}
            src={`/images/foundation-logo.svg`}
            name="Freedom Combination"
          />

          <Text color={'blue.500'} fontWeight={700} fontSize="xl">
            Dashboard
          </Text>
        </HStack>
      </Link>
      {/* User */}
      {user && (
        <AdminSidebarProfile user={user} profile={profile} onLogout={logout} />
      )}

      {/* Menu */}

      <Stack flex={1} overflow="auto">
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

      {/* Footer */}

      <VStack gap={0} fontSize={'sm'}>
        <Text>Freedom Combination</Text>
        <Text>&copy; All rights reserved</Text>
      </VStack>
    </Stack>
  )
}
