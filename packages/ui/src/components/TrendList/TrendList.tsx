import { SkeletonText, VStack, Wrap } from '@chakra-ui/react'

import { TwitterTrend } from '@fc/types'

import { useHashtagContext } from '../HashtagProvider'
import { TrendListItem } from '../TrendListItem'

interface TrendListProps {
  trends?: TwitterTrend[] | null
  isLoading: boolean
  hashtagInTrends?: TwitterTrend
  hashtagExtraInTrends?: TwitterTrend
}

export const TrendList = ({
  trends,
  isLoading,
  hashtagInTrends,
  hashtagExtraInTrends,
}: TrendListProps): JSX.Element => {
  const { activePostId, addTrendToPost, removeTrendFromPost } =
    useHashtagContext()

  const onAddTrendName = (value: string) => {
    if (!activePostId) return

    addTrendToPost(activePostId, value)
  }

  const onRemoveTrendName = (value: string) => {
    if (!activePostId) return

    removeTrendFromPost(activePostId, value)
  }

  return (
    <VStack align="stretch">
      {isLoading || !trends ? (
        <SkeletonText skeletonHeight={6} noOfLines={5} />
      ) : (
        <Wrap>
          {trends.map((tag, i) => (
            <TrendListItem
              key={i}
              order={i + 1}
              trendName={tag.name}
              tweetsCount={tag.tweet_volume}
              hashtagInTrends={hashtagInTrends?.name}
              hashtagExtraInTrends={hashtagExtraInTrends?.name}
              addTrend={onAddTrendName}
              removeTrend={onRemoveTrendName}
            />
          ))}
        </Wrap>
      )}
    </VStack>
  )
}
