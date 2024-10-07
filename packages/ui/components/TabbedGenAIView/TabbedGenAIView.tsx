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
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import type { ArchiveContent, Hashtag, Post, Prison, Victim } from '@fc/types'

import { GenAlert } from './GenAlert'
import { TweetGenAI } from './TweetGenAI'
import { ArchivePopover } from '../ArchivePopover'
import { ArchivePostGenAI } from '../ArchivePostGenAI'
import { GenPostProvider } from '../GenPostProvider'
import { PostSentenceForm } from '../PostSentenceForm'

type TabbedGenViewProps = {
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
  const { t } = useTranslation()

  const colorScheme = post ? 'blue' : 'green'

  const categories = hashtag?.categories ?? []
  const victims = (
    post?.victim ? [post.victim] : (hashtag?.posts?.map(p => p.victim) ?? [])
  ) as Victim[]
  const prisons = (
    post?.prison ? [post.prison] : (hashtag?.posts?.map(p => p.prison) ?? [])
  ) as Prison[]

  const archiveContentQuery = useStrapiRequest<ArchiveContent>({
    endpoint: 'archive-contents',
    filters: {
      $or: [
        ...categories.map(category => ({
          categories: { id: { $eq: category.id } },
        })),
        ...(victims.length > 0
          ? victims.map(victim => ({
              victims: { id: { $eq: victim.id } },
            }))
          : []),
        ...(prisons.length > 0
          ? prisons.map(prison => ({
              prisons: { id: { $eq: prison.id } },
            }))
          : []),
      ],
    },
    locale,
    queryOptions: {
      enabled: categories.length > 0 || !!post?.victim || !!post?.prison,
    },
  })

  const archives = archiveContentQuery.data?.data ?? []

  if (!hashtag) return null
  if (archives?.length === 0) {
    return (
      <>
        <GenAlert
          hashtag={hashtag}
          categories={categories}
          victims={victims}
          prisons={prisons}
          showAlert={!!post}
          onArchiveCreate={archiveContentQuery.refetch}
        >
          {alertContent}
        </GenAlert>
        {post && (
          <GenPostProvider hashtag={hashtag} post={post} archives={archives}>
            <Stack p={{ base: 4, lg: 8 }}>
              <Heading>{t('sentences')}</Heading>
              <PostSentenceForm id={post.id} hashtagId={hashtag.id} />
            </Stack>
          </GenPostProvider>
        )}
      </>
    )
  }

  return (
    <GenPostProvider hashtag={hashtag} post={post} archives={archives}>
      <Tabs colorScheme={colorScheme}>
        <TabList overflowX={'auto'}>
          {archives.map(archiveContent => {
            return (
              <Tab
                key={archiveContent.id}
                _selected={{ fontWeight: 600, color: `${colorScheme}.500` }}
              >
                <ArchivePopover archiveId={archiveContent.id}>
                  <Text maxW={200} whiteSpace={'nowrap'}>
                    Archive {archiveContent.id}
                  </Text>
                </ArchivePopover>
              </Tab>
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
