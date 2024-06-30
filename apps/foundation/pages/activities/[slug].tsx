import { FC } from 'react'

import { Spinner } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serialize } from 'next-mdx-remote/serialize'

import { strapiRequest } from '@fc/lib'
import { getModelStaticPaths } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { Activity, StrapiLocale } from '@fc/types'
import { ActivityDetail } from '@fc/ui'
import { getLocalizedSlugs } from '@fc/utils'

import { Layout } from '../../components'

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
  const locale = context.locale as StrapiLocale
  const slug = context.params?.['slug'] as string

  const activityData = await strapiRequest<Activity>({
    endpoint: 'activities',
    filters: { slug: { $eq: slug } },
    locale,
  })

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
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}
