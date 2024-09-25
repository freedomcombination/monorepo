import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serialize } from 'next-mdx-remote/serialize'

import { strapiRequest } from '@fc/lib/request'
import { getModelStaticPaths } from '@fc/services/common/getModelStaticPaths'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Presentation, StrapiLocale } from '@fc/types'
import { Hero } from '@fc/ui/components/Hero'
import { PresentationTemplate } from '@fc/ui/components/PresentationTemplate'
import { getLocalizedSlugs } from '@fc/utils/getLocalizedSlugs'

import { Layout } from '../../components/index'

type PresentationDetailPageProps = InferGetStaticPropsType<
  typeof getStaticProps
>

const PresentationDetailPage: FC<PresentationDetailPageProps> = ({
  seo,
  source,
  flow,
}) => {
  return (
    <Layout seo={seo} isDark>
      <Hero title={seo?.title} />
      <PresentationTemplate
        title={seo?.title}
        description={seo?.description}
        source={source}
        flow={flow}
      />
    </Layout>
  )
}
export default PresentationDetailPage

export const getStaticPaths = async () => {
  return await getModelStaticPaths('presentations')
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale
  const slug = context.params?.['slug'] as string

  const presentationData = await strapiRequest<Presentation>({
    endpoint: 'presentations',
    filters: { slug: { $eq: slug } },
    locale,
  })

  if (!presentationData?.data?.length) return { notFound: true }

  const presentation = presentationData.data[0]

  const slugs = getLocalizedSlugs(presentation, locale)

  const title = presentation.title || ''
  const description = presentation.description || ''
  const content = presentation.content || ''
  const image = presentation.image || ''

  const seo = { title, description }

  const source = await serialize(content || '')

  return {
    props: {
      seo,
      image,
      source,
      slugs,
      flow: presentation.flow || [],
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}
