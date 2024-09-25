import { useMemo, useState } from 'react'

import { Box, Center, Group, SimpleGrid, Spinner } from '@chakra-ui/react'
import { addMinutes, formatDistanceToNow, isPast } from 'date-fns'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AiOutlineClear } from 'react-icons/ai'
import { FaSyncAlt } from 'react-icons/fa'

import {
  Button,
  IconButton,
  MenuRadioItem,
  MenuRadioItemGroup,
  Tooltip,
} from '@fc/chakra'
import { useAuthContext } from '@fc/context/auth'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { useTopics } from '@fc/services/topics/getTopics'
import { useSyncTopicsMutation } from '@fc/services/topics/syncTopics'
import type { StrapiLocale } from '@fc/types'
import { AdminLayout } from '@fc/ui/components/AdminLayout'
import { PageHeader } from '@fc/ui/components/PageHeader'
import { TopicCard } from '@fc/ui/components/TopicCard'

const NewsPage = () => {
  const { checkActionsPermission } = useAuthContext()
  const { data, isLoading } = useTopics()
  const syncTopic = useSyncTopicsMutation()
  const [filter, setFilter] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>()

  const { t } = useTranslation()

  const router = useRouter()
  const locale = router.locale

  const { topics, publishers } = useMemo(() => {
    const topicsInLocale = data?.data?.filter(d => d.locale === locale) || []

    const filteredResult = topicsInLocale?.filter(d =>
      filter.length > 0 ? filter.includes(d.publisher) : true,
    )

    const publishersResult = topicsInLocale
      ?.map(d => d.publisher)
      .filter((v, i, a) => a.indexOf(v) === i)

    if (searchTerm) {
      const keywords = searchTerm?.split(' ') || []
      const searchRegex = new RegExp(keywords.join('|'), 'gi')

      return {
        publishers: publishersResult,
        topics:
          data?.data?.filter(topicBase =>
            Object.values(topicBase).join(' ').match(searchRegex),
          ) || [],
      }
    }

    return {
      topics: filteredResult,
      publishers: publishersResult,
    }
  }, [data, filter, locale, searchTerm])

  const filterMenu = (
    <MenuRadioItemGroup
      title="Publishers"
      onValueChange={e => setFilter([e.value])}
    >
      {publishers?.map(publisher => (
        <MenuRadioItem key={publisher} value={publisher}>
          {publisher}
        </MenuRadioItem>
      ))}
    </MenuRadioItemGroup>
  )

  const canSync =
    checkActionsPermission('topic', 'sync') &&
    data?.updatedAt &&
    isPast(addMinutes(new Date(data.updatedAt), 10))

  const syncedStr =
    data?.updatedAt &&
    `Updated ${formatDistanceToNow(new Date(data.updatedAt), {
      addSuffix: true,
    })}`

  const keywords = {
    tr: [
      'insan hakları',
      'işkence',
      'adalet',
      'özgürlük',
      'hukuk',
      'haklar',
      'eşitlik',
      'demokrasi',
      'barış',
      'saygı',
    ],
    en: [
      'human rights',
      'torture',
      'justice',
      'freedom',
      'liberty',
      'law',
      'rights',
      'equality',
      'democracy',
      'peace',
      'respect',
    ],
    nl: [
      'mensenrechten',
      'marteling',
      'gerechtigheid',
      'vrijheid',
      'wet',
      'rechten',
      'gelijkheid',
      'democratie',
      'vrede',
      'respect',
    ],
  }

  return (
    <AdminLayout seo={{ title: t('news') }}>
      <PageHeader
        onSearch={setSearchTerm}
        filterMenu={filterMenu}
        filterMenuCloseOnSelect={false}
      >
        <Tooltip content={syncedStr} showArrow>
          <IconButton
            aria-label="Sync news"
            loading={syncTopic.isPending || isLoading}
            onClick={() => syncTopic.mutate()}
            disabled={!canSync || syncTopic.isPending || isLoading}
            icon={<FaSyncAlt />}
          />
        </Tooltip>
      </PageHeader>
      <Box overflow={'hidden'} flexShrink={0}>
        <Box overflowX={'auto'}>
          <Group overflowX={'auto'}>
            <IconButton
              aria-label="Clear filters"
              icon={<AiOutlineClear />}
              size={'sm'}
              variant={'outline'}
              onClick={() => setSearchTerm('')}
              colorPalette={'gray'}
            />
            {keywords[locale].map(keyword => (
              <Button
                key={keyword}
                colorPalette={'gray'}
                onClick={() => setSearchTerm(keyword)}
                variant={searchTerm === keyword ? 'solid' : 'outline'}
              >
                {keyword}
              </Button>
            ))}
          </Group>
        </Box>
      </Box>
      <SimpleGrid columns={{ base: 1 }} gap={4}>
        {isLoading ? (
          <Center h="60vh">
            <Spinner size="xl" />
          </Center>
        ) : (
          <>
            {topics?.map((topic, i) => (
              <TopicCard key={topic.url + i} topic={topic} />
            ))}
          </>
        )}
      </SimpleGrid>
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}

export default NewsPage
