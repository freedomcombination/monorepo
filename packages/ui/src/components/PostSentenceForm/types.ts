import { HashtagReturnType } from '@fc/types'

export type PostSentenceFormProps = {
  id: number
  hashtagId: number
  hashtag?: HashtagReturnType
}

export type PostSentenceFormItemProps = {
  id: number
  index: number
  sentence: string
  shareCount: number
  isPublished: boolean
  archiveId: number
}
