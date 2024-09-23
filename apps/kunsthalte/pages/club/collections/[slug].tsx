import { FC, useEffect, useRef, useState } from 'react'

import { useBreakpointValue } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getCollectionBySlug } from '@fc/services/collection/getBySlug'
import { getModelStaticPaths } from '@fc/services/common/staticPaths'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale } from '@fc/types'
import { CollectionTemplate } from '@fc/ui/components/CollectionTemplate'
import { getLocalizedSlugs } from '@fc/utils/getLocalizedSlugs'

import { Layout } from '../../../components/Layout'

type CollectionPageProps = InferGetStaticPropsType<typeof getStaticProps>

const CollectionPage: FC<CollectionPageProps> = ({ seo, collection }) => {
  const pageShow = useBreakpointValue({ base: 1, lg: 2 }) as number
  const centerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (centerRef.current && pageShow) {
      const center = centerRef.current

      setTimeout(() => {
        setHeight(center.offsetHeight - 60)
        setWidth(center.offsetWidth)
        setLoading(false)
      }, 1000)
    }
  }, [centerRef, pageShow])

  if (!collection) return null

  return (
    <Layout seo={seo}>
      <CollectionTemplate
        centerRef={centerRef}
        height={height}
        width={width}
        loading={loading}
        collection={collection}
        pageShow={pageShow}
      />
    </Layout>
  )
}
export default CollectionPage

export const getStaticPaths = async () => {
  return await getModelStaticPaths('collections')
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const slug = context.params?.slug as string

  const collection = await getCollectionBySlug(locale, slug)

  if (!collection) return { notFound: true }

  const slugs = getLocalizedSlugs(collection, locale)

  const title = collection.title || ''

  const seo = {
    title,
  }

  return {
    props: {
      ...(await ssrTranslations(locale)),
      seo,
      slugs,
      collection,
    },
    revalidate: 1,
  }
}
