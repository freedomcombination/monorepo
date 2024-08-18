import { Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { RequestCollectionArgs, strapiRequest } from '@fc/lib'
import { useStrapiRequest } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { Activity, StrapiLocale, UploadFile } from '@fc/types'
import {
  AnimatedBox,
  Card,
  Container,
  Hero,
  Pagination,
  useChangeParams,
  FormattedDate,
} from '@fc/ui'

import { Layout } from '../../components'

const args: RequestCollectionArgs<Activity> = {
  endpoint: 'activities',
  sort: ['date:desc'],
  filters: { approvalStatus: { $eq: 'approved' } },
}

const Activities = () => {
  const { locale, query } = useRouter()
  const { t } = useTranslation()

  const title = t('activities')

  const page = +(query.page || 1)

  const changeParam = useChangeParams()

  const activitiesQuery = useStrapiRequest<Activity>({
    ...args,
    locale,
    page,
    queryOptions: {
      queryKey: ['activities', args],
    },
  })

  const { data, loading } = activitiesQuery

  const pagination = data?.meta?.pagination
  const activities = data?.data || []

  return (
    <Layout seo={{ title }} isDark>
      <Hero title={title} />

      {activities[0] || loading ? (
        <>
          <Container>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
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
                    date={<FormattedDate date={activity.date} />}
                    place={activity.place}
                  />
                </AnimatedBox>
              ))}
            </SimpleGrid>
            {pagination && (
              <Pagination
                totalCount={pagination.pageCount}
                currentPage={+(query.page || 1)}
                onPageChange={page => changeParam({ page })}
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

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['activities', args],
    queryFn: () => strapiRequest<Activity>({ ...args, locale }),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}
