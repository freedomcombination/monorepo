import { FC } from 'react'

import { GetStaticPropsContext } from 'next'

import { getModelStaticPaths } from '@fc/services/common/getModelStaticPaths'
import { getPlatformStaticProps } from '@fc/services/platform/getPlatformStaticProps'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale } from '@fc/types'
import {
  PlatformTemplate,
  PlatformTemplateProps,
} from '@fc/ui/components/PlatformTemplate'

import { Layout } from '../../components/Layout'

const PlatformDetailPage: FC<PlatformTemplateProps> = ({
  seo,
  source,
  image,
  link,
}) => {
  if (!source) return null

  return (
    <Layout seo={seo}>
      <PlatformTemplate seo={seo} source={source} image={image} link={link} />
    </Layout>
  )
}
export default PlatformDetailPage

export const getStaticPaths = async () => {
  return await getModelStaticPaths('platforms')
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const props = await getPlatformStaticProps(context)
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
      ...props,
    },
    revalidate: 1,
  }
}
