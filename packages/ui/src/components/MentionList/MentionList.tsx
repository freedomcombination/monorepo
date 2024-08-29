import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { MentionUserData } from '@fc/types'

import { useHashtagContext } from '../HashtagProvider'
import { MentionListItem } from '../MentionListItem'
import { MentionListPanel } from '../MentionListPanel'

export const MentionList = () => {
  const { activePostId, savedMentions, removeStoredMention, addMentionToPost } =
    useHashtagContext()

  const { t } = useTranslation()

  const onAddMention = (value: MentionUserData) => {
    if (value.screen_name && activePostId) {
      addMentionToPost(activePostId, value.screen_name)
    }
  }

  const onRemoveMention = (value: MentionUserData) => {
    if (value.screen_name) {
      removeStoredMention(value.screen_name)
    }
  }

  return (
    <VStack align="stretch" h={400}>
      <VStack minH="0" h="full" align="stretch" bg="white" overflowY="auto">
        <Tabs
          size="sm"
          colorScheme={'primary'}
          isFitted
          variant="line"
          bg="white"
        >
          <TabList pos="sticky" top="0" bg="white">
            <Tab data-testid="tab-popular">{t('post.mention-tab-popular')}</Tab>
            <Tab data-testid="tab-saved">{t('post.mention-tab-saved')}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <MentionListPanel />
            </TabPanel>
            <TabPanel p={0}>
              {savedMentions?.map((data, i) => (
                <MentionListItem
                  key={i}
                  data={data}
                  onRemoveItem={onRemoveMention}
                  onAddItem={onAddMention}
                />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </VStack>
  )
}
