import { FC, useEffect, useMemo, useState } from 'react'

import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { NextSeo, NextSeoProps } from 'next-seo'
import { useLocalStorage } from 'react-use'

import { ASSETS_URL } from '@fc/config'
import { strapiRequest } from '@fc/lib'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import {
  Activity,
  Blog,
  RecommendedTopic,
  StrapiLocale,
  StrapiTranslatableModel,
  TopicBase,
} from '@fc/types'
import { Container, Navigate, TopicCard } from '@fc/ui'
import { getLocalizedSlugs, getPageSeo } from '@fc/utils'

import { Layout } from '../components'

type RecommendsPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>

const RecommendsPage: FC<RecommendsPageProps> = ({ topic, topics, seo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchKey, setSearchKey] = useState('')
  const [hiddenUrls, setHiddenUrls] = useLocalStorage<string[]>(
    'hidden-urls',
    [],
  )
  // if any hidden topic (which can be blog or activity) is in the list, filter it
  const baseTopics = useMemo(
    () =>
      topics?.filter((topic: TopicBase) => !hiddenUrls?.includes(topic.url)) ||
      [],
    [hiddenUrls, topics],
  )
  const [topicsState, setTopicsState] = useState(baseTopics)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value)
  }

  useEffect(() => {
    // setSearchKey('') , this side-effect can be triggered from TopicCard so if there is a searchKey, we should keep it
    setTopicsState(baseTopics)
  }, [baseTopics])

  useEffect(() => {
    if (searchKey) {
      const filteredTopics = baseTopics.filter(topic => {
        const content = `${topic.title}  ${topic.description}`

        // Regex to match the search key
        const regex = new RegExp(searchKey, 'gi')

        return content.match(regex)
      })
      setTopicsState(filteredTopics)
    } else {
      setTopicsState(baseTopics)
    }
  }, [searchKey, baseTopics])

  useEffect(() => {
    if (topic) {
      onOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, topicsState])

  const handleClose = () => {
    onClose()
  }

  // It is for single topic
  return (
    <Layout seo={seo}>
      <NextSeo {...seo} />

      <Modal size={'6xl'} isOpen={isOpen && !!topic} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={{ base: 8, lg: 16 }}>
            {topic && (
              <TopicCard
                key={topic.id}
                topic={topic}
                setHiddenUrls={setHiddenUrls}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Container my={8}>
        <Stack spacing={4}>
          <Navigate href={`/tweets`}>
            <Button>Tweets</Button>
          </Navigate>
          <Input
            size={'lg'}
            onChange={handleSearch}
            value={searchKey}
            placeholder="Search topics"
            bg={'whiteAlpha.500'}
            _focus={{
              bg: 'white',
            }}
          />

          {topicsState?.map(topic => (
            <TopicCard
              key={topic.id}
              topic={topic}
              setHiddenUrls={setHiddenUrls}
            />
          ))}
        </Stack>
      </Container>
    </Layout>
  )
}
export default RecommendsPage

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  // const slug = context.params?.slug as string

  const queryClient = new QueryClient()
  // const queryKey = ['news', locale, slug]

  const id = context.query.id as string

  let recommendedTopic: RecommendedTopic | null = null
  let slugs = {}

  let seo: NextSeoProps = {
    title: 'Recommended Topics',
  }

  if (id) {
    await strapiRequest<RecommendedTopic>({
      endpoint: 'recommended-topics',
      id: Number(id),
      populate: ['localizations'],
    })
      .then(res => {
        if (res.data) {
          recommendedTopic = res.data
          seo = getPageSeo(recommendedTopic, 'recommended-topics', locale)
          slugs = getLocalizedSlugs(
            recommendedTopic as unknown as StrapiTranslatableModel,
            locale,
          )
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  await queryClient.prefetchQuery({
    queryKey: ['topics'],
    queryFn: () => getAllData(locale),
  })

  const topics = queryClient.getQueryData<TopicBase[]>(['topics']) || []

  return {
    props: {
      seo,
      topic: recommendedTopic as RecommendedTopic | null,
      topics,
      slugs,
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}

const getAllData = async (locale: StrapiLocale) => {
  const testDrive = process.env.NODE_ENV !== 'production'

  const response = await strapiRequest<RecommendedTopic>({
    endpoint: 'recommended-topics',
    locale,
    pageSize: 100,
  })
  const recommendedTopics = response.data?.map(topic => {
    const topicBase: TopicBase = {
      id: topic.id,
      url: topic.url,
      title: topic.title,
      description: topic.description,
      category: topic.category ?? '',
      image: topic.image,
      time: topic.time,
      locale: topic.locale,
      publisher: topic.publisher,
      isRecommended: true,
      type: 'Topic',
    }

    return topicBase
  })

  const today = new Date()
  today.setHours(23, 59, 0, 0)
  const monthAgo = new Date(
    today.getTime() - 30 * 24 * 60 * 60 * 1000,
  ).toISOString()

  const responseBlogs = await strapiRequest<Blog>({
    endpoint: 'blogs',
    locale,
    ...(testDrive
      ? { limit: 3 }
      : {
          filters: {
            createdAt: {
              $gte: monthAgo,
            },
          },
        }),
  })

  const mappedBlogs = responseBlogs.data?.map(blog => {
    const topicBase: TopicBase = {
      title: blog.title,
      description: blog.description || undefined,
      id: blog.id,
      image: blog.image ? ASSETS_URL + blog.image.url : undefined,
      url: `https://www.freedomcombination.com/${blog.locale}/blog/${blog.slug}`,
      category:
        blog.categories?.map(cat => cat[`name_${blog.locale}`]).join(', ') ??
        '',
      publisher: blog.author?.name || '',
      time: blog.publishedAt || blog.createdAt,
      isRecommended: true,
      type: 'Blog',
      locale: blog.locale,
    }

    return topicBase
  })

  const responseActivities = await strapiRequest<Activity>({
    endpoint: 'activities',
    locale,
    ...(testDrive
      ? { limit: 3 }
      : {
          filters: {
            createdAt: {
              $gte: monthAgo,
            },
          },
        }),
  })

  const mappedActivities = responseActivities.data?.map(activity => {
    const topicBase: TopicBase = {
      id: activity.id,
      image: activity.image ? ASSETS_URL + activity.image.url : undefined,
      url: `https://www.freedomcombination.com/${activity.locale}/activities/${activity.slug}`,
      category:
        activity.categories
          ?.map(cat => cat[`name_${activity.locale}`])
          .join(', ') ?? '',
      publisher:
        activity.platforms
          ?.map(platform => platform[`name_${activity.locale}`])
          .join(', ') || '',
      time: activity.date,
      isRecommended: true,
      type: 'Activity',
      locale: activity.locale,
      title: activity.title,
      description: activity.description ?? undefined,
    }

    return topicBase
  })

  const allData = [
    ...recommendedTopics,
    ...mappedBlogs,
    ...mappedActivities,
  ].sort((a, b) =>
    a.time && b.time
      ? a.time < b.time
        ? 1
        : -1
      : a.publisher < b.publisher
        ? 1
        : -1,
  )

  return allData
}
