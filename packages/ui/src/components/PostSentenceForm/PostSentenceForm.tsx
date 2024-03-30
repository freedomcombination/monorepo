import { FC } from 'react'

import { Stack } from '@chakra-ui/react'

import { useGetHashtagSentences } from '@fc/services'

import { PostSentenceFormItem } from './PostSentenceFormItem'
import { PostSentenceFormProps } from './types'
import { PostSentenceCreator } from '../PostSentenceCreator'

export const PostSentenceForm: FC<PostSentenceFormProps> = ({
  id,
  hashtagId,
}) => {
  const { data: hashtagSentences } = useGetHashtagSentences(hashtagId)
  const sentences = hashtagSentences?.[id] ?? []

  return (
    <Stack spacing={4}>
      <PostSentenceCreator hashtagId={hashtagId} postId={id} />

      {sentences.map(s => {
        const { value, shareCount, isPublished, index } = s

        return (
          <PostSentenceFormItem
            key={index}
            id={id}
            index={index}
            sentence={value}
            shareCount={Number(shareCount)}
            isPublished={isPublished}
          />
        )
      })}
    </Stack>
  )
}
