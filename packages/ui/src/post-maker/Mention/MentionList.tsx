import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
} from '@chakra-ui/react'
import { sample } from 'lodash'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'

import { MentionUserData } from '@fc/types'

import { MentionListPanel } from './MentionListPanel'
import { useHashtagContext } from '../HashtagProvider'

const MentionListItem = dynamic(() => import('./MentionListItem'), {
  ssr: false,
})

const MentionList: React.FC = () => {
  const { t } = useTranslation()
  const { activePostId, savedMentions, removeStoredMention, addMentionToPost } =
    useHashtagContext()

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

  const onRandomMention = () => {
    const randomMention = sample(savedMentions)

    if (randomMention?.screen_name && typeof activePostId === 'number') {
      addMentionToPost(activePostId, randomMention.screen_name)
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
            <Tab>{t('post.mention-tab-popular')}</Tab>
            <Tab>{t('post.mention-tab-saved')}</Tab>
            <Tab onClick={onRandomMention}>{t('post.mention-tab-random')}</Tab>
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

export default MentionList
