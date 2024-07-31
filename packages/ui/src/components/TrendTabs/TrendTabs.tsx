import { Box, Stack, Tabs } from '@chakra-ui/react'

import { useTrends } from '@fc/services'

import { useFindHashtagInTrends } from './useFindHashtagsInTrend'
import { TrendList } from '../TrendList'

export const TrendTabs = () => {
  const [hashtagInTrends, hashtagExtraInTrends] = useFindHashtagInTrends()

  const { data: trends, isLoading } = useTrends()

  return (
    <Stack h={400}>
      <Box overflowY="auto" bg="white">
        <Tabs.Root colorPalette="primary" isFitted size="sm">
          <Tabs.List pos="sticky" top="0" bg="white">
            <Tabs.Trigger>World</Tabs.Trigger>
            <Tabs.Trigger>TR</Tabs.Trigger>
            <Tabs.Trigger>NL</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content>
            <TrendList
              isLoading={isLoading}
              trends={trends?.en}
              hashtagInTrends={hashtagInTrends?.en}
              hashtagExtraInTrends={hashtagExtraInTrends?.en}
            />
          </Tabs.Content>
          <Tabs.Content>
            <TrendList
              isLoading={isLoading}
              trends={trends?.tr}
              hashtagInTrends={hashtagInTrends?.tr}
              hashtagExtraInTrends={hashtagExtraInTrends?.tr}
            />
          </Tabs.Content>
          <Tabs.Content>
            <TrendList
              isLoading={isLoading}
              trends={trends?.nl}
              hashtagInTrends={hashtagInTrends?.nl}
              hashtagExtraInTrends={hashtagExtraInTrends?.nl}
            />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Stack>
  )
}
