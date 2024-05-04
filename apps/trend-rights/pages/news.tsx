import { FC } from 'react'

import { Stack, Button } from '@chakra-ui/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { Container, Navigate, NewsFeed } from '@fc/ui'

import { Layout } from '../components'

type RecommendsPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>

const RecommendsPage: FC<RecommendsPageProps> = () => {
  return (
    <Layout seo={{ title: 'News' }}>
      <Container my={8}>
        <Stack spacing={4}>
          <Navigate href={`/tweets`}>
            <Button>Tweets</Button>
          </Navigate>
          <NewsFeed />
        </Stack>
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
