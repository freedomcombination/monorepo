import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { getArtistServerProps } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { ArtistTemplate } from '@fc/ui'

import { Layout } from '../../../components'

type ArtistPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const ArtistPage: FC<ArtistPageProps> = ({ artist, arts }) => {
  const onToggleLike = () => {
    // TODO: Implement useQuery refetch
  }

  return (
    <Layout seo={{ title: artist.name || 'Artist' }} isDark>
      <ArtistTemplate refetch={onToggleLike} artist={artist} arts={arts} />
    </Layout>
  )
}
export default ArtistPage

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient()
  const { artist, arts } = await getArtistServerProps(context)
  const locale = context.locale as StrapiLocale

  if (!artist) return { notFound: true }

  return {
    props: {
      artist,
      arts,
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}
