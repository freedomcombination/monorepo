import { Box, Stack } from '@chakra-ui/react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import {
  RequestCollectionArgs,
  strapiRequest,
} from '@fc/services/common/strapiRequest'
import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Hashtag, StrapiLocale } from '@fc/types'
import { AnimatedBox } from '@fc/ui/components/AnimatedBox'
import { Container } from '@fc/ui/components/Container'
import { HashtagCard } from '@fc/ui/components/HashtagCard'
import { Hero } from '@fc/ui/components/Hero'

import { Layout } from '../../components/Layout'

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
        <Stack gap={{ base: 4, lg: 8 }} my={{ base: 4, lg: 8 }}>
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

  const args: RequestCollectionArgs<Hashtag> = {
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
