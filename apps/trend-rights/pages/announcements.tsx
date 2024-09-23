import { FC } from 'react'

import { Box, Text, VStack } from '@chakra-ui/react'
import { QueryClient } from '@tanstack/react-query'
import { addHours, isPast, isWithinInterval } from 'date-fns'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import { RequestCollectionArgs, strapiRequest } from '@fc/lib/request'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Hashtag, StrapiCollectionResponse, StrapiLocale } from '@fc/types'
import { ButtonLink } from '@fc/ui/components/ButtonLink'
import { Container } from '@fc/ui/components/Container'
import { HashtagAnnouncement } from '@fc/ui/components/HashtagAnnouncement'
import { HashtagCard } from '@fc/ui/components/HashtagCard'
import { Hero } from '@fc/ui/components/Hero'
import { getItemLink } from '@fc/utils/getItemLink'
import { getPageSeo } from '@fc/utils/getPageSeo'

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

              <ButtonLink href={link || `/hashtags`}>
                {t('join-link')}
              </ButtonLink>
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
