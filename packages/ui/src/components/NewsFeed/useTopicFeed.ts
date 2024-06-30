import { Dispatch, SetStateAction, useMemo } from 'react'

import { endOfToday, subDays } from 'date-fns'
import { useRouter } from 'next/router'

import { useStrapiRequest } from '@fc/services'
import { Activity, Blog, RecommendedTopic, TopicBase } from '@fc/types'

export type UseTopicProps = {
  searchKey?: string
  setHiddenUrls?: Dispatch<SetStateAction<string[]>>
  hiddenUrls?: string[]
}

export type UseTopicReturns = {
  topics: TopicBase[]
  onDelete: (url: string) => void
  searchKey?: string
}

export const useRecommendedTopics: (
  props: UseTopicProps,
) => UseTopicReturns = props => {
  const { locale } = useRouter()
  const { data: rawData, refetch } = useStrapiRequest<RecommendedTopic>({
    endpoint: 'recommended-topics',
    locale,
    pageSize: 100,
  })

  const topics = useMemo(() => {
    const mappedData = rawData?.data.map(topic => {
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

    return mappedData ?? []
  }, [rawData?.data])

  const filteredTopics = useMemo(() => {
    if (!props.searchKey) return topics

    const regex = new RegExp(props.searchKey, 'gi')

    return topics.filter(topic => {
      return `${topic.title}  ${topic.description}`.match(regex)
    })
  }, [props?.searchKey, topics])

  return {
    topics: filteredTopics,
    onDelete: () => {
      refetch()
    },
    searchKey: props.searchKey,
  }
}

export const useBlogTopics: (
  props: UseTopicProps,
) => UseTopicReturns = props => {
  const { locale } = useRouter()

  /* fetch data */
  const { data: rawData } = useStrapiRequest<Blog>({
    endpoint: 'blogs',
    locale,
    ...(process.env.NODE_ENV !== 'production'
      ? { limit: 3 }
      : {
          filters: {
            createdAt: {
              $gte: subDays(endOfToday(), 30).toISOString(),
            },
          },
        }),
  })

  /* convert data */
  const topics = useMemo(() => {
    const mappedData = rawData?.data.map(blog => {
      const topicBase: TopicBase = {
        title: blog.title,
        description: blog.description || undefined,
        id: blog.id,
        image: blog.image?.url,
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

    return mappedData ?? []
  }, [rawData?.data])

  /* filter by url data */
  const visibleTopics = useMemo(() => {
    if (!props?.hiddenUrls || props.hiddenUrls.length === 0) return topics

    return topics.filter(topic => !props?.hiddenUrls?.includes(topic.url)) ?? []
  }, [topics, props?.hiddenUrls])

  /* filter by search key */
  const filteredTopics = useMemo(() => {
    if (!props.searchKey) return visibleTopics

    const regex = new RegExp(props.searchKey, 'gi')

    return visibleTopics.filter(topic => {
      return `${topic.title}  ${topic.description}`.match(regex)
    })
  }, [props?.searchKey, visibleTopics])

  /* return data */
  return {
    topics: filteredTopics,
    onDelete: (url: string) => {
      props?.setHiddenUrls?.(prev => [...prev, url])
    },
    searchKey: props.searchKey,
  }
}

export const useActivityTopics: (
  props: UseTopicProps,
) => UseTopicReturns = props => {
  const { locale } = useRouter()

  /* fetch data */
  const { data: rawData } = useStrapiRequest<Activity>({
    endpoint: 'activities',
    locale,
    ...(process.env.NODE_ENV !== 'production'
      ? { limit: 3 }
      : {
          filters: {
            createdAt: {
              $gte: subDays(endOfToday(), 30).toISOString(),
            },
          },
        }),
  })

  /* convert data */
  const topics = useMemo(() => {
    const mappedData = rawData?.data.map(activity => {
      const topicBase: TopicBase = {
        id: activity.id,
        image: activity.image?.url,
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

    return mappedData ?? []
  }, [rawData?.data])

  /* filter by url data */
  const visibleTopics = useMemo(() => {
    if (!props?.hiddenUrls || props.hiddenUrls.length === 0) return topics

    return topics.filter(topic => !props?.hiddenUrls?.includes(topic.url)) ?? []
  }, [topics, props?.hiddenUrls])

  /* filter by search key */
  const filteredTopics = useMemo(() => {
    if (!props.searchKey) return visibleTopics

    const regex = new RegExp(props.searchKey, 'gi')

    return visibleTopics.filter(topic => {
      return `${topic.title}  ${topic.description}`.match(regex)
    })
  }, [props?.searchKey, visibleTopics])

  /* return data */
  return {
    topics: filteredTopics,
    onDelete: (url: string) => {
      props?.setHiddenUrls?.(prev => [...prev, url])
    },
    searchKey: props.searchKey,
  }
}
