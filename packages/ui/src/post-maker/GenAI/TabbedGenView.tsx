import { useEffect, useState } from 'react'

import {
  Tabs,
  Link,
  TabList,
  Popover,
  PopoverTrigger,
  Tab,
  Text,
  PopoverContent,
  List,
  ListItem,
  Wrap,
  Badge,
  TabPanels,
  TabPanel,
  Button,
  Center,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { RiAddLine } from 'react-icons/ri'

import { useStrapiRequest } from '@fc/services'
import { ArchiveContent, Hashtag, Post } from '@fc/types'

import { ArchivePostGenAI } from './ArchivePostGenAI'
import { GenPostProvider } from './GenPostProvider'
import { TweetGenAI } from './TweetGenAI'

export type TabbedGenViewProps = {
  postId?: number
  hashtagId: number
}

export const TabbedGenAIView: React.FC<TabbedGenViewProps> = ({
  postId,
  hashtagId,
}) => {
  const { locale } = useRouter()
  const [archives, setArchives] = useState<ArchiveContent[]>([])
  const minHeight = 580
  const colorScheme = postId ? 'blue' : 'green'

  const hashtagQuery = useStrapiRequest<Hashtag>({
    endpoint: 'hashtags',
    id: hashtagId ?? 0,
  })

  const postQuery = useStrapiRequest<Post>({
    endpoint: 'posts',
    id: postId ?? 0,
    queryOptions: {
      enabled: !!postId,
    },
  })

  const hashtag = hashtagQuery.data?.data
  const post = postQuery.data?.data
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

  const archiveContents = archiveContentQuery.data?.data

  useEffect(() => {
    if (archiveContents?.length) setArchives(archiveContents)
  }, [archiveContents])

  if (archives.length === 0) {
    return (
      <Center
        p={4}
        minHeight={minHeight}
        bg={colorScheme + '.200'}
        border={1}
        borderColor={colorScheme + '.300'}
        rounded={'md'}
      >
        <VStack spacing={8}>
          <Text>No archive found. Would you like enter content manually?</Text>
          <Button
            colorScheme="black"
            variant={'outline'}
            leftIcon={<RiAddLine />}
            onClick={() =>
              setArchives([
                {
                  id: 0,
                  title: 'Empty Content',
                  source: 'Empty Content',
                  link: '',
                } as ArchiveContent,
              ])
            }
          >
            Create
          </Button>
        </VStack>
      </Center>
    )
  }

  return (
    <GenPostProvider
      hashtagId={hashtagId}
      image={hashtag?.image}
      postId={postId}
    >
      <Tabs colorScheme={colorScheme} minHeight={minHeight}>
        <TabList>
          {archives.map(archiveContent => {
            return (
              <Popover placement="top" key={archiveContent.id} trigger="hover">
                <PopoverTrigger>
                  <Tab>
                    <Text noOfLines={2} maxW={200} fontWeight={700}>
                      {archiveContent.title}
                    </Text>
                  </Tab>
                </PopoverTrigger>
                <PopoverContent>
                  <List p={2} spacing={2}>
                    <ListItem>{archiveContent.source}</ListItem>
                    <ListItem>
                      <Link isExternal href={archiveContent.link}>
                        {archiveContent.link}
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Wrap>
                        {archiveContent.categories?.map(c => (
                          <Badge key={c.id}>{c[`name_${locale}`]}</Badge>
                        ))}
                      </Wrap>
                    </ListItem>
                  </List>
                </PopoverContent>
              </Popover>
            )
          })}
        </TabList>
        <TabPanels>
          {archives.map(archiveContent => {
            return (
              <TabPanel px={0} key={archiveContent.id}>
                {postId ? (
                  <TweetGenAI
                    archiveContentId={archiveContent.id}
                    content={archiveContent.content}
                    postId={postId}
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
    </GenPostProvider>
  )
}
