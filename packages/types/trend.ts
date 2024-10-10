import { Localize } from './common'
import { StrapiBase } from './strapi'

export interface TwitterTrend {
  name: string
  url: string
  promoted_content: string | null
  query: string
  tweet_volume: number | null
}

export type Trend = StrapiBase & Localize<TwitterTrend[] | null>
