import { ReactNode } from 'react'

import { Post, PostSentence } from '@fc/types'

export type PostState = {
  availableCount: number
  count: number
  isExceeded: boolean
  percentage: number
  post: Post | null
  postContent: string
  sentence: PostSentence | null
  threshold: number
  sentences: PostSentence[]
}

export type PostActions = {
  setSentence: (sentence: PostSentence) => void
}

export type PostContextType = PostState & PostActions

export type PostProviderProps = {
  children: ReactNode
  post: Post
}
