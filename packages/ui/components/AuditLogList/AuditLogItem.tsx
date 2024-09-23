import { FC } from 'react'

import {
  Badge,
  Box,
  Center,
  HStack,
  Text,
  Group,
  chakra,
  ButtonProps,
  Flex,
} from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import { IconType } from 'react-icons'
import { FaRegTrashAlt, FaTimes } from 'react-icons/fa'
import {
  FaCheck,
  FaCircleInfo,
  FaPlus,
  FaQuestion,
  FaRegStar,
} from 'react-icons/fa6'
import { MdModeEditOutline, MdPublish, MdUnpublished } from 'react-icons/md'

import { Tooltip } from '@fc/chakra'
import type { AuditLog, AuditLogAction } from '@fc/types'

type AuditLogItemProps = {
  log: AuditLog
  isOwnProfile?: boolean
}

export const AuditLogItem: FC<AuditLogItemProps> = ({ log, isOwnProfile }) => {
  const colorMap: Record<AuditLogAction, ButtonProps['colorPalette']> = {
    approved: 'blue',
    created: 'green',
    deleted: 'red',
    published: 'purple',
    updated: 'yellow',
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

  const colorPalette = colorMap[log.action] || 'gray'
  const profile = log.profile
  const profileName = isOwnProfile ? 'You' : profile?.name || 'Strapi'
  const profileEmail = profile?.email || 'Strapi'

  const modelName = log.uid.split('.')[1]

  const message = (
    <>
      <Tooltip content={profileEmail} positioning={{ placement: 'top' }}>
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
    <Group wrap={'wrap'} p={{ base: 1, md: 0 }} gap={0}>
      <HStack gap={1}>
        {/* <WAvatar size={'sm'} name={profile?.name || ''} src={profile?.avatar} /> */}

        <Center
          boxSize={6}
          borderWidth={1}
          borderColor={`${colorPalette}.500`}
          rounded={'full'}
          color={`${colorPalette}.500`}
        >
          <Icon />
        </Center>

        <Badge colorPalette={colorPalette} variant="outline" fontWeight={600}>
          {modelName}
        </Badge>

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
      </HStack>

      <Flex wrap={'wrap'} align={'center'} ml={1}>
        <Text display={'inline'}>{message}</Text>
        {log.text?.length > 50 && (
          <Tooltip
            positioning={{ placement: 'top-start' }}
            content={<Box dangerouslySetInnerHTML={{ __html: log.text }} />}
          >
            <Box>
              <FaCircleInfo />
            </Box>
          </Tooltip>
        )}
        <Text
          display={'inline'}
          color={'gray.400'}
          fontSize={'sm'}
          fontStyle={'italic'}
          lineClamp={1}
          dangerouslySetInnerHTML={{ __html: log.text }}
        />
      </Flex>
    </Group>
  )
}
