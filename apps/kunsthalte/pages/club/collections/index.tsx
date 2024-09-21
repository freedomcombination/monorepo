import { SimpleGrid } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { strapiRequest } from '@fc/lib/request'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Collection, StrapiLocale, UploadFile } from '@fc/types'
import { Card } from '@fc/ui/components/Card'
import { Container } from '@fc/ui/components/Container'
import { Hero } from '@fc/ui/components/Hero'

import { Layout } from '../../../components'

type CollectionsPageProps = InferGetStaticPropsType<typeof getStaticProps>

const CollectionsPage: NextPage<CollectionsPageProps> = ({ collections }) => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const title = t('collections')

  return (
    <Layout seo={{ title }} isDark>
      <Hero title={title} />
      <Container minH="inherit" py={{ base: 8, lg: 16 }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
          {collections?.data?.map((collection, i) => (
            <Card
              key={i}
              title={collection.title}
              image={collection.image as UploadFile}
              description={collection.description as string}
              link={`/${locale}/club/collections/${collection.slug}`}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}
export default CollectionsPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const collections = await strapiRequest<Collection>({
    endpoint: 'collections',
    locale,
  })

  if (!collections?.data) return { notFound: true }

  return {
    props: {
      ...(await ssrTranslations(locale)),
      collections,
    },
    revalidate: 1,
  }
}
