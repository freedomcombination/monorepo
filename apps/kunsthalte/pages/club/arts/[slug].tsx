import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next'
import { NextSeoProps } from 'next-seo'

import { SITE_URL } from '@fc/config/constants'
import { getSession } from '@fc/secrets'
import { getArtBySlug } from '@fc/services/art/getArtBySlug'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Art, StrapiLocale } from '@fc/types'
import { ArtTemplate } from '@fc/ui/components/ArtTemplate'
import { mapStrapiMediaToOgImages } from '@fc/utils/mapStrapiMediaToOgImages'

import { Layout } from '../../../components'

type ArtPageProps = InferGetStaticPropsType<typeof getServerSideProps>

const ArtPage: FC<ArtPageProps> = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <ArtTemplate />
    </Layout>
  )
}

export default ArtPage

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { params } = context
  const queryClient = new QueryClient()

  const locale = context.locale as StrapiLocale
  const { token } = await getSession(context.req, context.res)

  const queryKey = ['art', params?.slug]

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getArtBySlug(params?.slug as string, token),
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

  const image = art.image?.[0]

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
        // TODO add categories
      },
      images: mapStrapiMediaToOgImages(image, title),
    },
  }

  return {
    props: {
      seo,
      slugs: { en: slug, nl: slug, tr: slug },
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}
