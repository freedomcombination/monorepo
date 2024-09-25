import { Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Pagination } from '@fc/chakra'
import {
  RequestCollectionArgs,
  useStrapiRequest,
} from '@fc/services/common/strapiRequest'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Activity, StrapiLocale, UploadFile } from '@fc/types'
import { AnimatedBox } from '@fc/ui/components/AnimatedBox'
import { Card } from '@fc/ui/components/Card'
import { Container } from '@fc/ui/components/Container'
import { Hero } from '@fc/ui/components/Hero'
import { useChangeParams } from '@fc/ui/hooks/useChangeParam'

import { Layout } from '../../components/Layout'

const args: RequestCollectionArgs<Activity> = {
  endpoint: 'activities',
  sort: ['date:desc'],
  filters: {
    approvalStatus: { $eq: 'approved' },
    platforms: { id: { $in: [1] } },
  },
  populate: ['image', 'platforms'],
}

const Activities = () => {
  const { locale, query } = useRouter()
  const { t } = useTranslation()

  const title = t('activities')

  const page = +(query.page || 1)

  const { changePage } = useChangeParams()

  const activitiesQuery = useStrapiRequest<Activity>({
    ...args,
    locale,
    page,
  })

  const { data, isLoading } = activitiesQuery

  const pagination = data?.meta?.pagination
  const activities = data?.data || []

  return (
    <Layout seo={{ title }} isDark>
      <Hero title={title} />

      {activities[0] || isLoading ? (
        <>
          <Container>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              gap={{ base: 6, lg: 8 }}
              my={16}
            >
              {activities.map((activity, i) => (
                <AnimatedBox directing="to-down" delay={i} key={activity.id}>
                  <Card
                    title={activity.title}
                    description={activity.description || ''}
                    image={activity.image as UploadFile}
                    link={`/${locale}/activities/${activity.slug}`}
                  />
                </AnimatedBox>
              ))}
            </SimpleGrid>
            {pagination && (
              <Pagination
                count={pagination.pageCount}
                page={+(query.page || 1)}
                onPageChange={changePage}
              />
            )}
          </Container>
        </>
      ) : (
        <Stack minH="inherit" justify="center" align="center" gap={8}>
          <Image h={200} src="/images/no-blog.svg" alt="no blog" />
          <Text textAlign="center" fontSize="lg">
            Sorry! No activities published in this language.
          </Text>
        </Stack>
      )}
    </Layout>
  )
}

export default Activities

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}
