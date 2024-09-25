import { FC } from 'react'

import { Spinner } from '@chakra-ui/react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serialize } from 'next-mdx-remote/serialize'

import { getModelStaticPaths } from '@fc/services/common/getModelStaticPaths'
import { strapiRequest } from '@fc/services/common/strapiRequest'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type {
  Activity,
  StrapiCollectionResponse,
  StrapiLocale,
} from '@fc/types'
import { ActivityDetail } from '@fc/ui/components/ActivityDetail'
import { getLocalizedSlugs } from '@fc/utils/getLocalizedSlugs'

import { Layout } from '../../components/index'

type ActivityDetailPageProps = InferGetStaticPropsType<typeof getStaticProps>

const ActivityDetailPage: FC<ActivityDetailPageProps> = ({
  seo,
  source,
  image,
}) => {
  if (!source) return <Spinner />

  return (
    <Layout seo={seo}>
      <ActivityDetail image={image} source={source} title={seo.title} />
    </Layout>
  )
}
export default ActivityDetailPage

export const getStaticPaths = async () => {
  return await getModelStaticPaths('activities')
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const queryClient = new QueryClient()

  const locale = context.locale as StrapiLocale
  const slug = context.params?.['slug'] as string

  await queryClient.prefetchQuery({
    queryKey: ['activity', locale, slug],
    queryFn: () =>
      strapiRequest<Activity>({
        endpoint: 'activities',
        filters: { slug: { $eq: slug } },
        locale,
      }),
  })

  const activityData = queryClient.getQueryData<
    StrapiCollectionResponse<Activity[]>
  >(['activity', locale, slug])

  if (!activityData?.data?.length) return { notFound: true }

  const activity = activityData.data[0]

  const slugs = getLocalizedSlugs(activity, locale)

  const title = activity.title || ''
  const content = activity.content || ''
  const image = activity.image || ''

  const seo = { title, content }

  const source = await serialize(content || '')

  return {
    props: {
      seo,
      image,
      source,
      slugs,
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}
