import { SimpleGrid } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { useLocalStorage } from 'usehooks-ts'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale, TopicBase } from '@fc/types'
import { AdminLayout, TopicCard } from '@fc/ui'

const NewsBookmarkedPage = () => {
  const [bookmarksStorage] = useLocalStorage<TopicBase[]>('bookmarks', [])

  const { t } = useTranslation()

  return (
    <AdminLayout seo={{ title: t('bookmarked-news') }}>
      <SimpleGrid columns={{ base: 1 }} gap={4}>
        {bookmarksStorage?.map(topic => (
          <TopicCard key={topic.url} topic={topic} />
        ))}
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
  }
}

export default NewsBookmarkedPage
