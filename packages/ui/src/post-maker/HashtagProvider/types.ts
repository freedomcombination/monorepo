/* eslint-disable no-unused-vars */
import { ReactNode } from 'react'

import { UseDisclosureReturn } from '@chakra-ui/react'

import { MentionUserData, PostSentence, StrapiLocale } from '@fc/types'

export type HashtagStats = {
  unsharedCount: number
  totalSentences: number
  totalShares: number
}

export type PostStats = HashtagStats & {
  leastShareCount: number
}

export type HashtagActions = {
  addMentionToPost: (postId: number, mention: string) => void
  addTrendToPost: (postId: number, trend: string) => void
  removeDefaultTrendFromPost: (postId: number, mention: string) => void
  removeMentionFromPost: (postId: number, mention: string) => void
  removeStoredMention: (mention: string) => void
  removeTrendFromPost: (postId: number, trend: string) => void
  setActivePostId: (postId: number) => void
  setSentence: (sentence: PostSentence | null) => void
  setMentionSearchKey: (key: string) => void
  updatePostSentenceShares: (args: { postId: number } & PostStats) => void
  updateStoredMentions: (mention: MentionUserData) => void
}

export type HashtagState = {
  activePostId: number | null
  defaultTrends: Record<number, string[]>
  hashtagStats: Record<StrapiLocale, HashtagStats>
  mentionSearchKey: string
  mentionsDisclosure: UseDisclosureReturn
  postMentions: Record<number, string[]>
  postSentenceShares: Record<number, PostStats>
  hashtagSentences: Record<number, PostSentence[]>
  postTrends: Record<number, string[]>
  savedMentions: MentionUserData[]
  trendsDisclosure: UseDisclosureReturn
  archiveDisclosure: UseDisclosureReturn
  sentence: PostSentence | null
}

export type HashtagContextType = HashtagState & HashtagActions

export type HashtagProviderProps = {
  children: ReactNode
}
