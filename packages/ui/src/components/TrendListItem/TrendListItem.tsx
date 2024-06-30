import { FC } from 'react'

import { Box, HStack, Tag, TagLabel } from '@chakra-ui/react'

import { formatNumber } from '@fc/utils'

import { useHashtagContext } from '../HashtagProvider'

type TrendListItemProps = {
  trendName: string
  tweetsCount: number | null
  hashtagInTrends?: string
  hashtagExtraInTrends?: string
  order: number

  addTrend: (value: string) => void

  removeTrend: (value: string) => void
}

export const TrendListItem: FC<TrendListItemProps> = ({
  trendName,
  tweetsCount,
  hashtagInTrends,
  hashtagExtraInTrends,
  order,
  addTrend,
  removeTrend,
}) => {
  const isCurrentHashtag =
    hashtagInTrends === trendName || hashtagExtraInTrends === trendName

  const { postTrends, activePostId } = useHashtagContext()

  const activeTrends = activePostId ? postTrends?.[activePostId] : []
  const isAdded = activeTrends?.includes(trendName)

  const colorScheme = isCurrentHashtag
    ? 'twitter'
    : isAdded
      ? 'blackAlpha'
      : 'primary'

  const onTrendClick = (trendName: string) => {
    if (isCurrentHashtag) {
      return
    }
    if (isAdded) {
      return removeTrend(trendName)
    }
    addTrend(trendName)
  }

  return (
    <Tag
      rounded="full"
      variant="outline"
      colorScheme={colorScheme}
      onClick={() => onTrendClick(trendName)}
      cursor={isCurrentHashtag ? 'not-allowed' : 'pointer'}
      py={1}
    >
      <HStack as={TagLabel}>
        <Box>{order}</Box>
        <Box>{trendName}</Box>
        {tweetsCount && <Box fontSize="xs">({formatNumber(tweetsCount)})</Box>}
      </HStack>
    </Tag>
  )
}
