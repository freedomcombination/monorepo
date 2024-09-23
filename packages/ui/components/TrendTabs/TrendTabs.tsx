import {
  Box,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'

import { useTrends } from '@fc/services/trend'

import { useFindHashtagInTrends } from './useFindHashtagsInTrend'
import { TrendList } from '../TrendList'

export const TrendTabs = () => {
  const [hashtagInTrends, hashtagExtraInTrends] = useFindHashtagInTrends()

  const { data: trends, isLoading } = useTrends()

  return (
    <Stack h={400}>
      <Box overflowY="auto" bg="white">
        <Tabs colorScheme="primary" isFitted size="sm">
          <TabList pos="sticky" top="0" bg="white">
            <Tab data-testid="tab-world">World</Tab>
            <Tab data-testid="tab-tr">TR</Tab>
            <Tab data-testid="tab-nl">NL</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TrendList
                isLoading={isLoading}
                trends={trends?.en}
                hashtagInTrends={hashtagInTrends?.en}
                hashtagExtraInTrends={hashtagExtraInTrends?.en}
              />
            </TabPanel>
            <TabPanel>
              <TrendList
                isLoading={isLoading}
                trends={trends?.tr}
                hashtagInTrends={hashtagInTrends?.tr}
                hashtagExtraInTrends={hashtagExtraInTrends?.tr}
              />
            </TabPanel>
            <TabPanel>
              <TrendList
                isLoading={isLoading}
                trends={trends?.nl}
                hashtagInTrends={hashtagInTrends?.nl}
                hashtagExtraInTrends={hashtagExtraInTrends?.nl}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Stack>
  )
}
