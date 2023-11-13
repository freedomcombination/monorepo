import { Box, Stack } from '@chakra-ui/react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { RequestCollectionArgs, strapiRequest } from '@wsvvrijheid/lib'
import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'
import { AnimatedBox, Container, HashtagCard, Hero } from '@wsvvrijheid/ui'

import { Layout } from '../../components'

const HashtagEvents = () => {
  const router = useRouter()

  const { t } = useTranslation()
  const title = t('hashtags')

  const hashtagsQuery = useStrapiRequest<Hashtag>({
    endpoint: 'hashtags',
    locale: router.locale,
    filters: {
      approvalStatus: { $eq: 'approved' },
    },
    sort: ['date:desc'],
  })

  return (
    <Layout seo={{ title }} isDark>
      <Hero
        title={title}
        isFullHeight={false}
        image={'/images/hashtags-bg.jpeg'}
      />
      <Container overflowX="hidden">
        <Stack spacing={12} mb={12}>
          {hashtagsQuery.data?.data?.map((hashtag, i) => (
            <AnimatedBox
              directing={i % 2 === 0 ? 'to-left' : 'to-right'}
              delay={3}
              key={i}
            >
              <Box rounded="lg" overflow="hidden" bg="white" shadow="primary">
                <HashtagCard item={hashtag} />
              </Box>
            </AnimatedBox>
          ))}
        </Stack>
      </Container>
    </Layout>
  )
}

export default HashtagEvents

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale
  const queryClient = new QueryClient()

  const args: RequestCollectionArgs = {
    endpoint: 'hashtags',
    locale,
    filters: {
      approvalStatus: { $eq: 'approved' },
    },
    sort: ['date:desc'],
  }

  const queryKey = Object.entries(args)

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => strapiRequest<Hashtag>(args),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}
