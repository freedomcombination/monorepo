import { FC } from 'react'

import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { QueryClient } from '@tanstack/react-query'
import { addHours, isPast, isWithinInterval } from 'date-fns'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import { RequestCollectionArgs, strapiRequest } from '@fc/lib'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { Hashtag, StrapiCollectionResponse, StrapiLocale } from '@fc/types'
import {
  Container,
  HashtagAnnouncement,
  HashtagCard,
  Hero,
  Navigate,
} from '@fc/ui'
import { getItemLink, getPageSeo } from '@fc/utils'

import { Layout } from '../components'

type HashtagEventsProps = InferGetServerSidePropsType<typeof getServerSideProps>

const AnnouncementEvent: FC<HashtagEventsProps> = ({
  seo,
  hashtag,
  hashtagPassed,
  hashtagActive,
  link,
}) => {
  const { t } = useTranslation()
  const title = (!hashtagPassed && seo?.title) || t('hashtag-announcements')

  return (
    <Layout seo={{ title }} isDark>
      <Hero title={title} isFullHeight={false} />
      <Box py={16}>
        <Container maxW={'4xl'}>
          {hashtagActive && hashtag && <HashtagCard item={hashtag} />}
          {!hashtagActive && !hashtagPassed && hashtag && link && (
            <HashtagAnnouncement hashtag={hashtag} />
          )}
          {hashtagPassed && (
            <VStack mx={'auto'} maxW={'2xl'} textAlign={'center'} spacing={8}>
              <Text fontSize={'lg'} color={'primary'}>
                {t('join-previous-hashtag')}
              </Text>
              <Navigate href={link || `/hashtags`}>
                <Button>{t('join-link')}</Button>
              </Navigate>
            </VStack>
          )}
        </Container>
      </Box>
    </Layout>
  )
}

export default AnnouncementEvent

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  const queryClient = new QueryClient()

  const args: RequestCollectionArgs<Hashtag> = {
    endpoint: 'hashtags',
    locale,
    sort: ['date:desc'],
    filters: {
      approvalStatus: { $eq: 'approved' },
    },
    pageSize: 1,
  }

  const queryKey = Object.values(args)

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => strapiRequest<Hashtag>(args),
  })

  const hashtagsResponse =
    queryClient.getQueryData<StrapiCollectionResponse<Hashtag[]>>(queryKey)

  const hashtag = hashtagsResponse?.data?.[0]

  if (!hashtag) {
    return {
      props: {
        ...(await ssrTranslations(locale)),
        seo: {} as NextSeoProps,
        hashtagPassed: true,
        hashtagActive: false,
        hashtag: null,
        link: null,
      },
    }
  }

  const link = getItemLink(hashtag, 'hashtags')

  const seo = getPageSeo(hashtag, 'hashtags', locale, true)

  const source = await serialize(hashtag.content || '')
  const hashtagPassed = hashtag.date
    ? isPast(new Date(hashtag.date as string))
    : false

  const hashtagActive = hashtag.date
    ? isWithinInterval(hashtag.date, {
        start: new Date(),
        end: addHours(new Date(), 6),
      })
    : false

  return {
    props: {
      ...(await ssrTranslations(locale)),
      seo,
      source,
      hashtag,
      hashtagPassed,
      hashtagActive,
      link,
    },
  }
}
