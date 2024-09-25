import { FC } from 'react'

import { Container, SimpleGrid } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { strapiRequest } from '@fc/services/common/request'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Presentation, StrapiLocale, UploadFile } from '@fc/types'
import { AnimatedBox } from '@fc/ui/components/AnimatedBox'
import { Card } from '@fc/ui/components/Card'
import { FormattedDate } from '@fc/ui/components/FormattedDate'
import { Hero } from '@fc/ui/components/Hero'

import { Layout } from '../../components/Layout'

type PresentationsProps = InferGetStaticPropsType<typeof getStaticProps>

const PresentationPage: FC<PresentationsProps> = ({ presentations }) => {
  const { t } = useTranslation()
  const title = t('presentations')

  const { locale } = useRouter()

  return (
    <Layout seo={{ title }} isDark>
      <Hero title={title} />
      <Container maxW="container.xl">
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={{ base: 6, lg: 8 }}
          my={16}
        >
          {presentations.map((presentation, i) => (
            <AnimatedBox directing="to-down" delay={i} key={presentation.id}>
              <Card
                title={presentation.title}
                description={presentation.description || ''}
                image={presentation.image as UploadFile}
                link={`/${locale}/presentations/${presentation.slug}`}
                date={<FormattedDate date={presentation.date} />}
                place={presentation.place}
              />
            </AnimatedBox>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const presentationsData = await strapiRequest<Presentation>({
    endpoint: 'presentations',
    locale,
    sort: ['date:desc'],
  })

  return {
    props: {
      ...(await ssrTranslations(locale)),
      presentations: presentationsData?.data || [],
    },
    revalidate: 1,
  }
}

export default PresentationPage
