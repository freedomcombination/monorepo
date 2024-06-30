import { RecommendedTweet } from '@fc/types'

export type RecommendedTweetCardProps = {
  tweet: RecommendedTweet
}

export interface RecommendedSocialButtonsProps {
  tweet: RecommendedTweet
  isVertical?: boolean | undefined
}
