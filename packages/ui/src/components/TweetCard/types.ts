import { StackProps } from '@chakra-ui/react'

import { Tweet } from '@fc/types'

import { TweetContentProps } from '../TweetContent'

export type TweetCardProps = {
  tweet: Tweet
  originalTweet?: Tweet
  bookmarkable?: boolean
  editable?: boolean
  isRecommended?: boolean
} & TweetContentProps &
  StackProps
