import { FC } from 'react'

import {
  Badge,
  Center,
  HStack,
  Text,
  ThemeTypings,
  Tooltip,
  Wrap,
  chakra,
} from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import { IconType } from 'react-icons'
import { FaRegTrashAlt, FaTimes } from 'react-icons/fa'
import { FaCheck, FaPlus, FaQuestion, FaRegStar } from 'react-icons/fa6'
import { MdModeEditOutline, MdPublish, MdUnpublished } from 'react-icons/md'

import { AuditLog, AuditLogAction } from '@fc/types'

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
    updated: MdModeEditOutline,
    unpublished: MdUnpublished,
    rejected: FaTimes,
  }

  const colorScheme = colorMap[log.action] || 'gray'
  const profile = log.profile
  const profileName = isOwnProfile ? 'You' : profile?.name || 'Unknown'

  const modelName = log.uid.split('.')[1]

  const message = (
    <>
      <Tooltip
        label={profile.email}
        placement="top"
        bg={'white'}
        color={'gray.700'}
        borderWidth={1}
      >
        <chakra.span
          _hover={{ color: 'primary.500' }}
          textTransform={'capitalize'}
          fontWeight={600}
          cursor={'pointer'}
        >
          {profileName}
        </chakra.span>
      </Tooltip>{' '}
      {log.action} {formatDistanceToNow(log.createdAt, { addSuffix: true })}
    </>
  )

  const Icon = iconMap[log.action] || FaQuestion

  return (
    <Wrap p={{ base: 1, md: 0 }} spacing={0}>
      <HStack spacing={1}>
        {/* <WAvatar size={'sm'} name={profile?.name || ''} src={profile?.avatar} /> */}

        <Center
          boxSize={6}
          borderWidth={1}
          borderColor={`${colorScheme}.500`}
          rounded={'full'}
          color={`${colorScheme}.500`}
        >
          <Icon />
        </Center>

        {isOwnProfile && (
          <Center
            boxSize={6}
            borderWidth={1}
            borderColor={'yellow.500'}
            rounded={'full'}
            color={'yellow.500'}
          >
            <FaRegStar />
          </Center>
        )}
        <Badge colorScheme={colorScheme} variant="outline" fontWeight={600}>
          {modelName}
        </Badge>
      </HStack>

      <Wrap align={'center'} ml={1}>
        <Text display={'inline'}>{message}</Text>
        <Text
          display={'inline'}
          color={'gray.400'}
          fontSize={'sm'}
          fontStyle={'italic'}
        >
          {log.text}
        </Text>
      </Wrap>
    </Wrap>
  )
}
