import { FC } from 'react'

import { HStack, Stack, Text } from '@chakra-ui/react'
import { formatDistanceStrict } from 'date-fns'

import { Comment } from '@fc/types'
import { getMediaUrl } from '@fc/utils'

import { WAvatar } from '../WAvatar'

interface CommentItemProps {
  comment: Comment
}

export const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  const name = comment?.profile?.name || comment.name || 'Anonymous'

  return (
    <HStack align="start">
      <WAvatar
        size="sm"
        src={getMediaUrl(comment.profile?.avatar)}
        name={name}
      />
      <Stack fontSize="sm">
        <HStack>
          <Text fontWeight={600}>{name}</Text>
          <Text textColor="gray.500" fontSize="xs">
            {formatDistanceStrict(new Date(comment.createdAt), new Date())}
          </Text>
        </HStack>

        {/* TODO Add read more button like instagram */}
        <Text noOfLines={3}>{comment.content}</Text>
      </Stack>
    </HStack>
  )
}
