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

import { useHashtag } from '@fc/services'

import { TrendTabs } from '../TrendTabs'
import { TweetWidget } from '../TweetWidget'

export const TimelineTrendsTabs = () => {
  const { t } = useTranslation()

  const hashtag = useHashtag()

  if (!hashtag) return null

  return (
    <Stack h={780}>
      <Box overflowY="auto" bg="white" borderWidth={1}>
        <Tabs colorScheme="primary" isFitted size="sm">
          <TabList pos="sticky" top="0" bg="white">
            <Tab py={2}>Timeline</Tab>
            <Tab py={2}>{t('post.trends-label')}</Tab>
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
