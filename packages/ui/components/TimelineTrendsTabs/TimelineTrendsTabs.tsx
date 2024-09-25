import {
  Box,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { useHashtagBySlug } from '@fc/services/hashtag/getHashtagBySlug'

import { TrendTabs } from '../TrendTabs'
import { TweetWidget } from '../TweetWidget'

export const TimelineTrendsTabs = () => {
  const { t } = useTranslation()

  const hashtag = useHashtagBySlug()

  if (!hashtag) return null

  return (
    <Stack h={780}>
      <Box overflowY="auto" bg="white" borderWidth={1}>
        <Tabs colorScheme="primary" isFitted size="sm">
          <TabList pos="sticky" top="0" bg="white">
            <Tab data-testid="tab-timeline" py={2}>
              Timeline
            </Tab>
            <Tab data-testid="tab-trends" py={2}>
              {t('post.trends-label')}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TweetWidget
                title={t('post.latest-tweets-label')}
                tweets={hashtag?.tweets}
              />
            </TabPanel>
            <TabPanel>
              <TrendTabs />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Stack>
  )
}
