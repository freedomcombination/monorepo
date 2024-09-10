import { Tabs, VStack } from '@chakra-ui/react'
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
        <Tabs.Root
          size="sm"
          colorPalette={'primary'}
          fitted
          variant="line"
          bg="white"
        >
          <Tabs.List pos="sticky" top="0" bg="white">
            <Tabs.Trigger data-testid="tab-popular" value="popular">
              {t('post.mention-tab-popular')}
            </Tabs.Trigger>
            <Tabs.Trigger data-testid="tab-saved" value="saved">
              {t('post.mention-tab-saved')}
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.ContentGroup>
            <Tabs.Content value="popular" p={0}>
              <MentionListPanel />
            </Tabs.Content>
            <Tabs.Content value="saved" p={0}>
              {savedMentions?.map((data, i) => (
                <MentionListItem
                  key={i}
                  data={data}
                  onRemoveItem={onRemoveMention}
                  onAddItem={onAddMention}
                />
              ))}
            </Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs.Root>
      </VStack>
    </VStack>
  )
}
