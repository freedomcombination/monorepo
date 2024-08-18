import { FC } from 'react'

import { Box, Separator, Stack, useBreakpointValue } from '@chakra-ui/react'

import { RecommendedTweet, Tweet } from '@fc/types'
import { getMediaUrl } from '@fc/utils'

import { RecommendedSocialButtons } from './RecommendedSocialButtons'
import { RecommendedTweetCardProps } from './types'
import { TweetCard } from '../TweetCard'

export const RecommendedTweetCard: FC<RecommendedTweetCardProps> = ({
  tweet,
}) => {
  const isVertical = useBreakpointValue({
    base: true,
    lg: false,
  })

  const mapRecommendedTweetToTweet = (
    recommendedTweet: RecommendedTweet,
  ): Partial<Tweet> => {
    let image: string | undefined

    if (recommendedTweet?.image?.url) {
      image = getMediaUrl(recommendedTweet.image)
    }

    if (recommendedTweet?.originalTweet?.image) {
      image = recommendedTweet?.originalTweet?.image
    }

    return {
      text: recommendedTweet.text,
      user: recommendedTweet.originalTweet?.user,
      image,
      video: recommendedTweet?.video?.url,
    }
  }

  return (
    <Stack
      bg={'white'}
      rounded={'md'}
      shadow={'sm'}
      align={'space-between'}
      overflow="hidden"
      gap={0}
    >
      <TweetCard
        tweet={mapRecommendedTweetToTweet(tweet) as Tweet}
        editable
        shadow={'none'}
        isRecommended
      />
      <Separator />
      <Box p={2}>
        <RecommendedSocialButtons tweet={tweet} isVertical={isVertical} />
      </Box>
    </Stack>
  )
}
