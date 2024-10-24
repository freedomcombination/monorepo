import { Box, Stack, Tabs } from '@chakra-ui/react'
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
        <Tabs.Root colorPalette="primary" fitted size="sm">
          <Tabs.List pos="sticky" top="0" bg="white">
            <Tabs.Trigger data-testid="tab-timeline" value="timeline" py={2}>
              Timeline
            </Tabs.Trigger>
            <Tabs.Trigger data-testid="tab-trends" value="trends" py={2}>
              {t('post.trends-label')}
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.ContentGroup>
            <Tabs.Content value="timeline">
              <TweetWidget
                title={t('post.latest-tweets-label')}
                tweets={hashtag?.tweets}
              />
            </Tabs.Content>
            <Tabs.Content value="trends">
              <TrendTabs />
            </Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs.Root>
      </Box>
    </Stack>
  )
}
