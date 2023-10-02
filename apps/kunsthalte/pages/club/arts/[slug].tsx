import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { NextSeoProps } from 'next-seo'

import { ASSETS_URL, SITE_URL } from '@wsvvrijheid/config'
import { strapiRequest } from '@wsvvrijheid/lib'
import { getArtBySlug } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Art, StrapiLocale } from '@wsvvrijheid/types'
import { ArtTemplate } from '@wsvvrijheid/ui'

import { Layout } from '../../../components'

type ArtPageProps = InferGetStaticPropsType<typeof getStaticProps>

const ArtPage: FC<ArtPageProps> = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <ArtTemplate />
    </Layout>
  )
}

export default ArtPage

export const getStaticPaths: GetStaticPaths = async () => {
  const artsResponse = await strapiRequest<Art>({
    endpoint: 'arts',
  })

  const paths = artsResponse.data?.map(({ slug }) => ({
    params: { slug },
  }))

  return { paths, fallback: true }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context
  const queryClient = new QueryClient()

  const locale = context.locale as StrapiLocale

  const queryKey = ['art', params?.slug]

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getArtBySlug(params?.slug as string),
  })

  const art = queryClient.getQueryData<Art>(queryKey)

  if (!art)
    return {
      notFound: true,
    }

  const titleKey = `title_${locale}` as keyof Art
  const descriptionKey = `description_${locale}` as keyof Art

  const title = (art[titleKey] || '') as string
  const description = (art[descriptionKey] || '') as string
  const slug = art.slug

  const image = art.image

  const seo: NextSeoProps = {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/club/arts/${slug}`,
      article: {
        publishedTime: art.publishedAt as string,
        modifiedTime: art.updatedAt as string,
        authors: [art.artist?.name || art.artist?.email || ''],
        // TODO add tags
      },
      images: image
        ? [
            {
              url: ASSETS_URL + image.url,
              secureUrl: ASSETS_URL + image.url,
              type: image.mime,
              width: image.width,
              height: image.height,
              alt: title,
            },
          ]
        : [],
    },
  }

  return {
    props: {
      seo,
      slugs: { en: slug, nl: slug, tr: slug },
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}
