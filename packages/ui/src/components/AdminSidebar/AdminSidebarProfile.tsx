import { FC } from 'react'

import { Box, HStack, Text } from '@chakra-ui/react'
import { GoSignOut } from 'react-icons/go'

import { IconButton, Tooltip } from '@fc/chakra'
import { Profile, SessionUser } from '@fc/types'

import { WAvatar } from '../WAvatar'

export type AdminSidebarProfileProps = {
  user: SessionUser
  profile: Profile | null
  onLogout: () => void
}

export const AdminSidebarProfile: FC<AdminSidebarProfileProps> = ({
  user,
  profile,
  onLogout,
}) => {
  return (
    <HStack p={4}>
      <WAvatar size="sm" src={profile?.avatar} name={user?.username} />

      <Box flex={1} fontSize="sm" lineHeight={1.25}>
        <Text w={160} lineClamp={1} fontWeight={600}>
          {profile?.name || user?.username}
        </Text>
        <Text w={160} lineClamp={1} textTransform={'capitalize'}>
          {user?.roles.join(' - ')}
        </Text>
      </Box>

      <Tooltip content="Logout">
        <IconButton
          size="sm"
          fontSize="lg"
          _hover={{ color: 'red.500' }}
          aria-label="Logout"
          icon={<GoSignOut />}
          variant="ghost"
          onClick={onLogout}
        />
      </Tooltip>
    </HStack>
  )
}
