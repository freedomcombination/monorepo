import { FC, createContext, useContext, useEffect, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { sampleSize } from 'lodash'
import { useRouter } from 'next/router'

import { useGetHashtagSentences, useHashtag } from '@wsvvrijheid/services'

import { initialHashtagContext } from './state'
import { HashtagContextType, HashtagProviderProps, PostStats } from './types'

export const HashtagContext = createContext<HashtagContextType>(
  initialHashtagContext,
)

export const HashtagProvider: FC<HashtagProviderProps> = ({ children }) => {
  const [activePostId, setActivePostId] = useState<number | null>(null)
  const [mentionSearchKey, setMentionSearchKey] = useState<string>('')
  const [postMentions, setPostMentions] = useState<Record<number, string[]>>({})
  const [postTrends, setPostTrends] = useState<Record<number, string[]>>({})
  const [defaultTrends, setDefaultTrends] = useState<Record<number, string[]>>(
    {},
  )
  const hashtag = useHashtag()
  const [postSentenceShares, setPostSentenceShares] = useState<
    Record<number, PostStats>
  >({})

  const { locale } = useRouter()

  const hashtagSentences = useGetHashtagSentences(hashtag?.id)

  const mentionsDisclosure = useDisclosure()
  const trendsDisclosure = useDisclosure()

  const removeStoredMention = () => {
    return
  }

  const updatePostSentenceShares = ({
    postId,
    ...args
  }: { postId: number } & PostStats) => {
    setPostSentenceShares(prev => ({
      ...prev,
      [postId]: args,
    }))
  }

  const updateStoredMentions = () => {
    return
  }

  const addMentionToPost = (postId: number, mention: string) => {
    if (!postId) return

    const mentions = postMentions[postId] ?? []
    const updatedMentions = [...mentions, mention]

    setPostMentions({
      ...postMentions,
      [postId]: updatedMentions,
    })
  }

  const hashtagStats = Object.values(postSentenceShares).reduce(
    (acc, curr) => {
      return {
        ...acc,
        unsharedCount: (acc.unsharedCount || 0) + (curr.unsharedCount || 0),
        totalSentences: (acc.totalSentences || 0) + (curr.totalSentences || 0),
        totalShares: (acc.totalShares || 0) + (curr.totalShares || 0),
      }
    },
    {
      unsharedCount: 0,
      totalSentences: 0,
      totalShares: 0,
    },
  )

  const addTrendToPost = (postId: number, trend: string) => {
    if (!postId) return

    const trends = postTrends[postId] ?? []
    const updatedTrends = [...trends, trend]

    setPostTrends({
      ...postTrends,
      [postId]: updatedTrends,
    })
  }

  const removeMentionFromPost = (postId: number, mention: string) => {
    if (!postId) return

    const mentions = postMentions[postId] ?? []
    const updatedMentions = mentions.filter(m => m !== mention)

    setPostMentions({
      ...postMentions,
      [postId]: updatedMentions,
    })
  }

  const removeTrendFromPost = (postId: number, trend: string) => {
    if (!postId) return

    const trends = postTrends[postId] ?? []
    const updatedTrends = trends.filter(m => m !== trend)

    setPostTrends({
      ...postTrends,
      [postId]: updatedTrends,
    })
  }

  const removeDefaultTrendFromPost = (postId: number, trend: string) => {
    if (!postId) return

    const trends = defaultTrends[postId] ?? []
    const updatedTrends = trends.filter(m => m !== trend)

    setDefaultTrends({
      ...defaultTrends,
      [postId]: updatedTrends,
    })
  }

  useEffect(() => {
    if (hashtag?.posts?.length) {
      const hashtagMentions = hashtag.mentions?.map(m => m.username) ?? []
      const defaultTrends = [
        hashtag.hashtagDefault,
        hashtag.hashtagExtra,
      ].filter(Boolean) as string[]

      const initialTags = hashtag.posts.reduce(
        (acc, post) => {
          const mentions = {
            ...acc.mentions,
            [post.id]: sampleSize(hashtagMentions, 1),
          }

          const trends = {
            ...acc.trends,
            [post.id]: defaultTrends,
          }

          return { ...acc, mentions, trends }
        },
        {
          trends: {},
          mentions: {},
        },
      )
      setPostMentions(initialTags.mentions)
      setDefaultTrends(initialTags.trends)
    }
  }, [locale])

  return (
    <HashtagContext.Provider
      value={{
        // state
        activePostId,
        defaultTrends,
        hashtagSentences,
        hashtagStats,
        mentionSearchKey,
        mentionsDisclosure,
        postMentions,
        postSentenceShares,
        postTrends,
        savedMentions: [],
        trendsDisclosure,

        // actions
        addMentionToPost,
        addTrendToPost,
        removeDefaultTrendFromPost,
        removeMentionFromPost,
        removeStoredMention,
        removeTrendFromPost,
        setActivePostId,
        setMentionSearchKey,
        updatePostSentenceShares,
        updateStoredMentions,
      }}
    >
      {children}
    </HashtagContext.Provider>
  )
}

export const useHashtagContext = () => useContext(HashtagContext)
