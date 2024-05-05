import { useMemo, useState } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  Center,
  IconButton,
  MenuItemOption,
  MenuOptionGroup,
  SimpleGrid,
  Spinner,
  Tooltip,
} from '@chakra-ui/react'
import { addMinutes, formatDistanceToNow, isPast } from 'date-fns'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AiOutlineClear } from 'react-icons/ai'
import { FaSyncAlt } from 'react-icons/fa'

import { useAuthContext } from '@fc/context'
import { useTopic, useTopicSync } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { AdminLayout, PageHeader, TopicCard } from '@fc/ui'

const NewsPage = () => {
  const { checkActionsPermission } = useAuthContext()
  const { data, isLoading } = useTopic()
  const syncTopic = useTopicSync()
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
    <MenuOptionGroup
      title="Publishers"
      type="checkbox"
      onChange={value => setFilter(value as string[])}
    >
      {publishers?.map(publisher => (
        <MenuItemOption key={publisher} value={publisher}>
          {publisher}
        </MenuItemOption>
      ))}
    </MenuOptionGroup>
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
        <Tooltip label={syncedStr} hasArrow bg="primary.400">
          <IconButton
            aria-label="Sync news"
            isLoading={syncTopic.isPending || isLoading}
            onClick={() => syncTopic.mutate()}
            isDisabled={!canSync || syncTopic.isPending || isLoading}
            icon={<FaSyncAlt />}
          />
        </Tooltip>
      </PageHeader>
      <Box overflow={'hidden'} flexShrink={0}>
        <Box overflowX={'auto'}>
          <ButtonGroup size={'sm'} overflowX={'auto'} colorScheme={'gray'}>
            <IconButton
              aria-label="Clear filters"
              icon={<AiOutlineClear />}
              size={'sm'}
              variant={'outline'}
              onClick={() => setSearchTerm('')}
            />
            {keywords[locale].map(keyword => (
              <Button
                key={keyword}
                onClick={() => setSearchTerm(keyword)}
                variant={searchTerm === keyword ? 'solid' : 'outline'}
              >
                {keyword}
              </Button>
            ))}
          </ButtonGroup>
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
