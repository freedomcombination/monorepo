import { FC } from 'react'

import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { isPast } from 'date-fns'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'

import { SITE_URL } from '@fc/config'
import { strapiRequest } from '@fc/lib'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { Hashtag, InstagramPost, StrapiLocale } from '@fc/types'
import {
  ButtonLink,
  Container,
  HashtagAnnouncement,
  HashtagsSummary,
  InstagramTimeline,
} from '@fc/ui'
import { getItemLink } from '@fc/utils'

import { Layout } from '../components'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

const Home: FC<HomeProps> = ({ hashtags, instagramPosts }) => {
  const { t } = useTranslation()
  const link = getItemLink(hashtags?.[0], 'hashtags')

  const hashtag = hashtags?.[0]
  const hasStarted = isPast(new Date(hashtag?.date as string))

  return (
    <Layout seo={{ title: t('home') }} isDark>
      <Box
        bgGradient={'linear(to-b, primary.400, primary.500)'}
        mt={{ base: '-64px', lg: '-100px' }}
        pb={{ base: 16, lg: 32 }}
      >
        <Container>
          <Stack
            color="white"
            gap={6}
            alignItems={{ base: 'center', lg: 'center' }}
            justifyContent={'center'}
            textAlign={{ base: 'center', lg: 'center' }}
            minH={{ base: 'calc(100vh - 64px)', lg: 'calc(100vh - 100px)' }}
          >
            <Heading size="xl" color="white">
              {t('home.post-maker.title')}
            </Heading>

            <Text fontSize="xl" fontWeight={400}>
              {t('home.post-maker.content')}
            </Text>

            <ButtonLink
              href={link || '/'}
              size={'lg'}
              fontWeight={600}
              variant="solid"
              bg="white"
              color="primary.500"
              boxShadow="lg"
              whiteSpace="normal"
              _hover={{ color: 'white', bg: 'blackAlpha.100' }}
              py={'4'}
              h={'auto'}
            >
              {t('home.post-maker.button')}
            </ButtonLink>
          </Stack>
        </Container>
      </Box>

      {!hasStarted && link && hashtag && (
        <Box bg={'primary.50'} py={16} borderBottomWidth={1}>
          <Container maxW={'4xl'}>
            <HashtagAnnouncement hashtag={hashtag} />
          </Container>
        </Box>
      )}

      {hashtags.length > 0 && <HashtagsSummary hashtags={hashtags} />}

      {instagramPosts?.length > 0 && (
        <Box bg={'gray.50'} py={16}>
          <Container maxW={'6xl'}>
            <InstagramTimeline posts={instagramPosts} />
          </Container>
        </Box>
      )}
    </Layout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const { data: hashtags } = await strapiRequest<Hashtag>({
    endpoint: 'hashtags',
    locale,
    filters: {
      approvalStatus: { $eq: 'approved' },
    },
    sort: ['date:desc'],
    pageSize: 4,
  })

  let instagramPosts: InstagramPost[] = []

  try {
    const response = await fetch(
      (process.env.NODE_ENV === 'development'
        ? 'http://localhost:3004'
        : SITE_URL) + '/api/instagram',
    )

    if (!response.ok) throw new Error('Network response was not ok')

    const data = await response.json()

    instagramPosts = data.data
  } catch (error: any) {
    console.error('Error fetching Instagram posts:', error)
  }

  return {
    props: {
      ...(await ssrTranslations(locale)),
      hashtags,
      instagramPosts,
    },
    revalidate: 1,
  }
}

export default Home
