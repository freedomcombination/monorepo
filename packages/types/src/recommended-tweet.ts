import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { Mention } from './mention'
import { StrapiBase } from './strapi'
import { Tweet } from './tweet'

export type RecommendedTweetBase = {
  isShared: boolean
  text: string
  videoUrl?: string
  locale: StrapiLocale
}

type RecommendedTweetRelation = {
  video?: UploadFile | null
  image?: UploadFile | null
  caps?: UploadFile | null
  originalTweet: Tweet | null
  mentions: Mention[]
}

type RecommendedTweetRelationInput = {
  video?: File
  image?: File
  caps?: File
  originalTweet?: JSON
  mentions?: number[]
}

export type RecommendedTweetCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    RecommendedTweetBase,
    'isShared' | 'videoUrl'
  > &
    RecommendedTweetRelationInput
>

export type RecommendedTweet = StrapiBase &
  RecommendedTweetBase &
  RecommendedTweetRelation
