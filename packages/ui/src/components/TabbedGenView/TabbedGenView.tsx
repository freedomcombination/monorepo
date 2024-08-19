import { ReactNode } from 'react'

import { Heading, Stack, Tabs, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@fc/services'
import { ArchiveContent, Hashtag, Post } from '@fc/types'

import { GenAlert } from './GenAlert'
import { TweetGenAI } from './TweetGenAI'
import { ArchivePopover } from '../ArchivePopover'
import { ArchivePostGenAI } from '../ArchivePostGenAI'
import { GenPostProvider } from '../GenPostProvider'
import { PostSentenceForm } from '../PostSentenceForm'

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
  const { t } = useTranslation()

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
      <>
        <GenAlert
          hashtag={hashtag}
          categories={categories}
          tags={tags}
          showTagAlert={!!post}
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
      <Tabs.Root colorScheme={colorScheme}>
        <Tabs.List overflowX={'auto'}>
          {archives.map(archiveContent => {
            return (
              <Tabs.Trigger
                value={`${archiveContent.id}`}
                key={archiveContent.id}
                _selected={{ fontWeight: 600, color: `${colorScheme}.500` }}
              >
                <ArchivePopover archiveId={archiveContent.id}>
                  <Text maxW={200} whiteSpace={'nowrap'}>
                    Archive {archiveContent.id}
                  </Text>
                </ArchivePopover>
              </Tabs.Trigger>
            )
          })}
        </Tabs.List>
        <Tabs.ContentGroup>
          {archives.map(archiveContent => {
            return (
              <Tabs.Content
                value={`${archiveContent.id}`}
                px={0}
                py={noBorder ? 0 : 2}
                key={archiveContent.id}
              >
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
              </Tabs.Content>
            )
          })}
        </Tabs.ContentGroup>
      </Tabs.Root>
      {post && (
        <Stack p={{ base: 4, lg: 8 }}>
          <Heading>{t('sentences')}</Heading>
          <PostSentenceForm id={post.id} hashtagId={hashtag.id} />
        </Stack>
      )}
    </GenPostProvider>
  )
}
