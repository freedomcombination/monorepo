import { FC, useState } from 'react'

import { Center, Input, Stack, Tabs } from '@chakra-ui/react'
import { debounce } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useLocalStorage } from 'usehooks-ts'

import {
  UseTopicProps,
  UseTopicReturns,
  useActivityTopics,
  useBlogTopics,
  useRecommendedTopics,
} from './useTopicFeed'
import { TopicCard } from '../TopicCard'

export const NewsFeed = () => {
  const [searchKey, setSearchKey] = useState('')
  const [hiddenUrls, setHiddenUrls] = useLocalStorage<string[]>(
    'hiddenUrls',
    [],
  )

  const { t } = useTranslation()
  const handleSearchKey = debounce(setSearchKey, 500)

  return (
    <Stack gap={4}>
      <Input
        size={'lg'}
        onChange={e => handleSearchKey(e.target.value)}
        placeholder="Search topics"
        bg={'whiteAlpha.500'}
        _focus={{
          bg: 'white',
        }}
      />
      <Tabs.Root colorScheme="primary">
        <Tabs.List>
          <Tabs.Trigger data-testid="tab-news" value="news" fontWeight={600}>
            {t('recommended-news')}
          </Tabs.Trigger>
          <Tabs.Trigger data-testid="tab-blogs" value="blogs" fontWeight={600}>
            {t('blogs')}
          </Tabs.Trigger>
          <Tabs.Trigger
            data-testid="tab-activities"
            value="activities"
            fontWeight={600}
          >
            {t('activities')}
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.ContentGroup>
          <Tabs.Content value="news" px={0}>
            <PanelRecommended
              searchKey={searchKey}
              hiddenUrls={hiddenUrls}
              setHiddenUrls={setHiddenUrls}
            />
          </Tabs.Content>
          <Tabs.Content value="blogs" px={0}>
            <PanelBlog
              searchKey={searchKey}
              hiddenUrls={hiddenUrls}
              setHiddenUrls={setHiddenUrls}
            />
          </Tabs.Content>
          <Tabs.Content value="activities" px={0}>
            <PanelActivity
              searchKey={searchKey}
              hiddenUrls={hiddenUrls}
              setHiddenUrls={setHiddenUrls}
            />
          </Tabs.Content>
        </Tabs.ContentGroup>
      </Tabs.Root>
    </Stack>
  )
}

const PanelRecommended: FC<UseTopicProps> = props => {
  const data = useRecommendedTopics(props)

  return <Feed {...data} />
}

const PanelBlog: FC<UseTopicProps> = props => {
  const data = useBlogTopics(props)

  return <Feed {...data} />
}

const PanelActivity: FC<UseTopicProps> = props => {
  const data = useActivityTopics(props)

  return <Feed {...data} />
}

const Feed: FC<UseTopicReturns> = props => {
  const { topics, ...rest } = props
  const { t } = useTranslation()

  return (
    <Stack gap={4}>
      {topics.length > 0 ? (
        topics.map(topic => (
          <TopicCard key={topic.id} topic={topic} {...rest} />
        ))
      ) : (
        <Center minH={'200px'} fontSize={'lg'}>
          {t('no-data')}
        </Center>
      )}
    </Stack>
  )
}
