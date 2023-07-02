import { FC } from 'react'

import { SimpleGrid } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { i18nConfig } from '@wsvvrijheid/config'
import { useSearchModel } from '@wsvvrijheid/services'
import { RecommendedTopic, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, TopicCard } from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const NewsBookmarkedPage: FC<PageProps> = ({ seo }) => {
  const { locale } = useRouter()

  const { data } = useSearchModel<RecommendedTopic>({
    url: 'api/recommended-topics',
    locale,
  })

  return (
    <AdminLayout seo={seo}>
      <SimpleGrid columns={{ base: 1 }} gap={4}>
        {data?.data?.map(topic => (
          <TopicCard
            key={topic.url}
            topic={{ ...topic, isRecommended: true }}
          />
        ))}
      </SimpleGrid>
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Recommended News',
    tr: 'Tavsite Haberler',
    nl: 'Aanbevolen Nieuws',
  }

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      ...(await serverSideTranslations(
        locale,
        ['common', 'admin'],
        i18nConfig,
      )),
    },
  }
}

export default NewsBookmarkedPage
