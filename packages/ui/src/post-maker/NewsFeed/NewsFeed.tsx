import { FC, useState } from 'react'

import {
  Center,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
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
import { TopicCard } from '../../admin'

export const NewsFeed = () => {
  const [searchKey, setSearchKey] = useState('')
  const [hiddenUrls, setHiddenUrls] = useLocalStorage<string[]>(
    'hiddenUrls',
    [],
  )

  const { t } = useTranslation()
  const handleSearchKey = debounce(setSearchKey, 500)

  return (
    <Stack spacing={4}>
      <Input
        size={'lg'}
        onChange={e => handleSearchKey(e.target.value)}
        placeholder="Search topics"
        bg={'whiteAlpha.500'}
        _focus={{
          bg: 'white',
        }}
      />
      <Tabs colorScheme="primary">
        <TabList>
          <Tab fontWeight={600}>{t('recommended-news')}</Tab>
          <Tab fontWeight={600}>{t('blogs')}</Tab>
          <Tab fontWeight={600}>{t('activities')}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <PanelRecommended
              searchKey={searchKey}
              hiddenUrls={hiddenUrls}
              setHiddenUrls={setHiddenUrls}
            />
          </TabPanel>
          <TabPanel px={0}>
            <PanelBlog
              searchKey={searchKey}
              hiddenUrls={hiddenUrls}
              setHiddenUrls={setHiddenUrls}
            />
          </TabPanel>
          <TabPanel px={0}>
            <PanelActivity
              searchKey={searchKey}
              hiddenUrls={hiddenUrls}
              setHiddenUrls={setHiddenUrls}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
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
    <Stack spacing={4}>
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
