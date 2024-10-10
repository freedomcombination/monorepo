import { FC } from 'react'

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale } from '@fc/types'
import { Container } from '@fc/ui/components/Container'
import { NewsFeed } from '@fc/ui/components/NewsFeed'

import { Layout } from '../components'

type RecommendsPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>

const RecommendsPage: FC<RecommendsPageProps> = () => {
  return (
    <Layout seo={{ title: 'News' }}>
      <Container my={8}>
        <NewsFeed />
      </Container>
    </Layout>
  )
}
export default RecommendsPage

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}
