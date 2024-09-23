import { Box, Stack, Tabs } from '@chakra-ui/react'

import { useTrends } from '@fc/services/trend'

import { useFindHashtagInTrends } from './useFindHashtagsInTrend'
import { TrendList } from '../TrendList'

export const TrendTabs = () => {
  const [hashtagInTrends, hashtagExtraInTrends] = useFindHashtagInTrends()

  const { data: trends, isLoading } = useTrends()

  return (
    <Stack h={400}>
      <Box overflowY="auto" bg="white">
        <Tabs.Root colorPalette="primary" fitted size="sm">
          <Tabs.List pos="sticky" top="0" bg="white">
            <Tabs.Trigger data-testid="tab-world" value="world">
              World
            </Tabs.Trigger>
            <Tabs.Trigger data-testid="tab-tr" value="tr">
              TR
            </Tabs.Trigger>
            <Tabs.Trigger data-testid="tab-nl" value="nl">
              NL
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.ContentGroup>
            <Tabs.Content value="world">
              <TrendList
                loading={isLoading}
                trends={trends?.en}
                hashtagInTrends={hashtagInTrends?.en}
                hashtagExtraInTrends={hashtagExtraInTrends?.en}
              />
            </Tabs.Content>
            <Tabs.Content value="tr">
              <TrendList
                loading={isLoading}
                trends={trends?.tr}
                hashtagInTrends={hashtagInTrends?.tr}
                hashtagExtraInTrends={hashtagExtraInTrends?.tr}
              />
            </Tabs.Content>
            <Tabs.Content value="nl">
              <TrendList
                loading={isLoading}
                trends={trends?.nl}
                hashtagInTrends={hashtagInTrends?.nl}
                hashtagExtraInTrends={hashtagExtraInTrends?.nl}
              />
            </Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs.Root>
      </Box>
    </Stack>
  )
}
