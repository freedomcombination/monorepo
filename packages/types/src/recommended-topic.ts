import { Expand } from './common'
import { StrapiBase } from './strapi'
import { TopicBase } from './topic'

export type RecommendedTopicBase = {
  skipped: boolean
  posted: boolean
} & Omit<TopicBase, 'isRecommended'>

export type RecommendedTopicCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    RecommendedTopicBase,
    'skipped' | 'posted'
  >
>

export type RecommendedTopic = StrapiBase & RecommendedTopicBase
