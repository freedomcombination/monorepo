import { FC } from 'react'

import { Badge, Box, HStack, Text, ThemeTypings } from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import { IconType } from 'react-icons'
import { FaRegTrashAlt, FaTimes } from 'react-icons/fa'
import { FaCheck, FaPencil, FaPlus, FaStar } from 'react-icons/fa6'
import { MdPublish, MdUnpublished } from 'react-icons/md'

import { AuditLog, AuditLogAction } from '@fc/types'

import { WAvatar } from '../../components'

type AuditLogItemProps = {
  log: AuditLog
  isOwnProfile?: boolean
}

export const AuditLogItem: FC<AuditLogItemProps> = ({ log, isOwnProfile }) => {
  const colorMap: Record<AuditLogAction, ThemeTypings['colorSchemes']> = {
    approved: 'blue',
    created: 'green',
    deleted: 'red',
    published: 'purple',
    updated: 'orange',
    unpublished: 'gray',
    rejected: 'pink',
  }

  const iconMap: Record<AuditLogAction, IconType> = {
    approved: FaCheck,
    created: FaPlus,
    deleted: FaRegTrashAlt,
    published: MdPublish,
    updated: FaPencil,
    unpublished: MdUnpublished,
    rejected: FaTimes,
  }

  const colorScheme = colorMap[log.action] || 'gray'
  const profile = log.profile
  const profileName = isOwnProfile ? 'You' : profile?.name || 'Unknown'

  const modelName = log.uid.split('.')[1]

  const message = (
    <>
      <strong>{profileName}</strong> {log.action}{' '}
      {formatDistanceToNow(log.createdAt, { addSuffix: true })}
    </>
  )

  const Icon = iconMap[log.action] || FaStar

  return (
    <HStack pos={'relative'}>
      <WAvatar size={'sm'} name={profile?.name || ''} src={profile?.avatar} />

      {isOwnProfile && (
        <Box p={1.5} bg={'yellow.400'} rounded={'full'} color={'yellow.700'}>
          <FaStar />
        </Box>
      )}
      <Box
        p={1.5}
        bg={`${colorScheme}.500`}
        rounded={'full'}
        color={'whiteAlpha.800'}
      >
        <Icon />
      </Box>

      <Text>{message}</Text>
      <Badge colorScheme={colorScheme} variant="outline" fontWeight={600}>
        {modelName}
      </Badge>
    </HStack>
  )
}
