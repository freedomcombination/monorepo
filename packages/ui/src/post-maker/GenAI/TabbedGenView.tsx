import { ReactNode } from 'react'

import {
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useRouter } from 'next/router'

import { useStrapiRequest } from '@fc/services'
import { ArchiveContent, Hashtag, Post } from '@fc/types'

import { ArchivePopover } from './ArchivePopover'
import { ArchivePostGenAI } from './ArchivePostGenAI'
import { GenAlert } from './GenAlert'
import { GenPostProvider } from './GenPostProvider'
import { TweetGenAI } from './TweetGenAI'
import { PostSentenceForm } from '../../components'

export type TabbedGenViewProps = {
  post?: Post
  hashtag: Hashtag
  noBorder?: boolean
  alertContent?: ReactNode
}

export const TabbedGenAIView: React.FC<TabbedGenViewProps> = ({
  post,
  hashtag,
  noBorder,
  alertContent,
}) => {
  const { locale } = useRouter()

  const colorScheme = post ? 'blue' : 'green'

  const categories = hashtag?.categories ?? []
  const tags = post?.tags ?? []

  const archiveContentQuery = useStrapiRequest<ArchiveContent>({
    endpoint: 'archive-contents',
    filters: {
      $or: [
        ...categories.map(category => ({
          categories: { id: { $eq: category.id } },
        })),
        ...tags.map(tag => ({
          tags: { id: { $eq: tag.id } },
        })),
      ],
    },
    locale,
    queryOptions: {
      enabled: categories.length > 0 || tags.length > 0,
    },
  })

  const archives = archiveContentQuery.data?.data ?? []

  if (!hashtag) return null

  if (archives?.length === 0) {
    return (
      <GenAlert
        hashtag={hashtag}
        categories={categories}
        tags={tags}
        showTagAlert={!!post}
        onArchiveCreate={archiveContentQuery.refetch}
      >
        {alertContent}
      </GenAlert>
    )
  }

  return (
    <GenPostProvider hashtag={hashtag} post={post} archives={archives}>
      <Tabs colorScheme={colorScheme}>
        <TabList>
          {archives.map(archiveContent => {
            return (
              <ArchivePopover
                key={archiveContent.id}
                archiveId={archiveContent.id}
              >
                <Tab>
                  <Text noOfLines={2} maxW={200} fontWeight={700}>
                    {archiveContent.title}
                  </Text>
                </Tab>
              </ArchivePopover>
            )
          })}
        </TabList>
        <TabPanels>
          {archives.map(archiveContent => {
            return (
              <TabPanel px={0} py={noBorder ? 0 : 2} key={archiveContent.id}>
                {post ? (
                  <TweetGenAI
                    archiveContentId={archiveContent.id}
                    content={archiveContent.content}
                    postId={post.id}
                  />
                ) : (
                  <ArchivePostGenAI
                    archiveContentId={archiveContent.id}
                    content={archiveContent.content}
                    referenceLink={archiveContent.link}
                  />
                )}
              </TabPanel>
            )
          })}
        </TabPanels>
      </Tabs>
      {post && (
        <Stack p={{ base: 4, lg: 8 }}>
          <Heading>{t('sentences')}</Heading>
          <PostSentenceForm id={post.id} hashtagId={hashtag.id} />
        </Stack>
      )}
    </GenPostProvider>
  )
}
