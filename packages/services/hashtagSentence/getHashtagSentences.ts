import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import type { PostSentence, RedisPost } from '@fc/types'

export const getHashtagSentences = async (hashtagId: number) => {
  const result = await axios.get<RedisPost[]>(
    `/api/kv/hashtag-sentences?hashtagId=${hashtagId}`,
  )

  return result.data
}

export const useGetHashtagSentences = (hashtagId: number) => {
  const { data, refetch } = useQuery<RedisPost[]>({
    queryKey: ['kv-hashtag-sentences', hashtagId],
    queryFn: () => getHashtagSentences(hashtagId),
    staleTime: 1000 * 3,
  })

  const result = useMemo(() => {
    if (!data?.length) return []

    const sortedSentences = (data
      .map((s, index) => {
        const [
          sentence = '',
          postId = 0,
          shareCount = 0,
          published = '0',
          archiveId = 0,
        ] = s.split('::')

        return {
          postId: Number(postId),
          value: sentence,
          shareCount: Number(shareCount),
          isPublished: published === '1',
          archiveId: Number(archiveId),
          index,
        } as PostSentence
      })
      .sort((a, b) => {
        return a.shareCount - b.shareCount
      }) || []) as PostSentence[]

    const sentencesByPostId = sortedSentences.reduce(
      (acc, cur) => {
        const { postId, ...rest } = cur

        if (!acc[postId]) {
          acc[postId] = []
        }

        acc[postId].push({
          postId,
          ...rest,
        })

        return acc
      },
      {} as Record<number, PostSentence[]>,
    )

    return sentencesByPostId
  }, [data])

  return {
    data: result,
    refetch,
  }
}
