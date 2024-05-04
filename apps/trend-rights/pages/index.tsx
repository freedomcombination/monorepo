import { FC } from 'react'

import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { isPast } from 'date-fns'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { NextSeoProps } from 'next-seo'

import { strapiRequest } from '@fc/lib'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { Hashtag, StrapiLocale } from '@fc/types'
import {
  Container,
  HashtagAnnouncement,
  HashtagsSummary,
  Navigate,
} from '@fc/ui'
import { getItemLink } from '@fc/utils'

import { Layout } from '../components'

interface HomeProps {
  seo: NextSeoProps
  hashtags: Hashtag[]
}

const Home: FC<HomeProps> = ({ hashtags }) => {
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
            spacing={6}
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

            <Button
              as={Navigate}
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
            </Button>
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

  return {
    props: {
      ...(await ssrTranslations(locale)),
      hashtags,
    },
    revalidate: 1,
  }
}

export default Home
