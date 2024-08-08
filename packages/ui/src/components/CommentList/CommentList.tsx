import { FC } from 'react'

import { Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { Comment } from '@fc/types'

import { CommentItem } from '../CommentItem'

type CommentListProps = {
  comments: Array<Comment>
}

export const CommentList: FC<CommentListProps> = ({ comments }) => {
  const { t } = useTranslation()

  return (
    <Stack p={4} gap={4} bg="white" boxShadow="base">
      <Text fontSize="lg" fontWeight={600}>
        {t('comments')}
      </Text>

      <Stack gap={4} maxH={300} overflowY={'auto'}>
        {comments?.map(comment => {
          return <CommentItem key={comment.id} comment={comment} />
        })}
      </Stack>
    </Stack>
  )
}
