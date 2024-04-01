import { SetOptional, SetRequired } from 'type-fest'

import { Category } from './category'
import { Expand } from './common'
import { UploadFile } from './file'
import { Mention } from './mention'
import { Post } from './post'
import { StrapiBase, StrapiCreatorRelation, StrapiEntityBase } from './strapi'
import { Tweet } from './tweet'

export type HashtagBase = StrapiEntityBase & {
  content: string | null
  hashtagDefault: string
  hashtagExtra: string | null
  date: string
  tweets: Array<Tweet> | null
}

type HashtagRelation = {
  image?: UploadFile | null
  posts?: Array<Post>
  categories?: Array<Category>
  mentions?: Array<Mention>
  localizations?: Array<Hashtag>
}

type HashtagRelationInput = {
  image?: File
  posts?: Array<number>
  categories?: Array<number>
  mentions?: Array<number>
}

export type HashtagCreateInput = Expand<
  { publishedAt?: Date | string | null } & SetOptional<
    Omit<HashtagBase, 'approvalStatus' | 'tweets'>,
    'hashtagExtra'
  > &
    SetRequired<HashtagRelationInput, 'image'>
>

export type HashtagUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<
    Omit<HashtagBase, 'locale' | 'tweets'>
  > &
    HashtagRelationInput
>

export type HashtagLocalizeInput = Pick<
  HashtagBase,
  'title' | 'description' | 'content' | 'approvalStatus'
>

export type Hashtag = StrapiBase &
  HashtagBase &
  HashtagRelation &
  StrapiCreatorRelation

export type HashtagReturnType = Hashtag & {
  hasPassed: boolean
  hasStarted: boolean
  defaultHashtags?: string[]
  posts: Post[]
}
