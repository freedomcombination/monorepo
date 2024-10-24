import { FC, useEffect } from 'react'

import { Box, Stack, useDisclosure } from '@chakra-ui/react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serialize } from 'next-mdx-remote/serialize'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@fc/chakra'
import { SITE_URL } from '@fc/config/constants'
import { useAuthContext } from '@fc/context/auth'
import { strapiRequest } from '@fc/services/common/strapiRequest'
import {
  getHashtagBySlug,
  useHashtagBySlug,
} from '@fc/services/hashtag/getHashtagBySlug'
import { getHashtagSentences } from '@fc/services/hashtagSentence/getHashtagSentences'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type {
  HashtagReturnType,
  PlatformSlug,
  Post,
  StrapiLocale,
} from '@fc/types'
import { Container } from '@fc/ui/components/Container'
import { HashtagProvider } from '@fc/ui/components/HashtagProvider'
import { PostImage } from '@fc/ui/components/PostImage'
import { PostMaker } from '@fc/ui/components/PostMaker'
import { TimeLeft } from '@fc/ui/components/TimeLeft'
import { getItemLink } from '@fc/utils/getItemLink'
import { getLocalizedSlugs } from '@fc/utils/getLocalizedSlugs'
import { getMediaUrl } from '@fc/utils/getMediaUrl'
import { getOgImageSrc } from '@fc/utils/getOgImageSrc'
import { getPageSeo } from '@fc/utils/getPageSeo'

import { Layout, PlusButton } from '../../../components'

type HashtagProps = InferGetServerSidePropsType<typeof getServerSideProps>

const HashtagPage: FC<HashtagProps> = ({
  hasStarted,
  seo,
  source,
  post,
  capsSrc,
  isIosSafari,
}) => {
  const hashtag = useHashtagBySlug()

  const { open, onClose, onOpen } = useDisclosure()
  const { query, push } = useRouter()
  const { roles } = useAuthContext()

  const { t } = useTranslation()

  useEffect(() => {
    if (post) {
      onOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post])

  const handleClose = () => {
    onClose()
    if (query.id) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...q } = query
      push({ query: q }, undefined, { shallow: true })
    }
  }

  if (!hashtag) return null

  return (
    <HashtagProvider>
      {capsSrc && (
        <Head>
          <meta property="twitter:image:src" content={capsSrc} />
        </Head>
      )}
      {post && (
        <Modal
          placement={'center'}
          open={open}
          onOpenChange={e => (e.open ? onOpen() : handleClose())}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalBody p={0}>
              <Stack>
                <PostImage size="sm" post={post} />
                <Box p={8}>{post.description}</Box>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleClose}>{t('post.see-other-posts')}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <Layout seo={seo}>
        <Container py={4} pos="relative">
          {hasStarted ||
          roles.includes('admin') ||
          roles.includes('contentmanager') ||
          roles.includes('contentmanager_translator') ? (
            <PostMaker isIosSafari={isIosSafari} />
          ) : (
            <TimeLeft date={hashtag.date as string} />
          )}
        </Container>
      </Layout>
      <PlusButton source={source} />
    </HashtagProvider>
  )
}

export default HashtagPage

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  const slug = context.params?.slug as string
  const { req, query } = context

  const queryClient = new QueryClient()
  const queryKey = ['hashtag', locale, slug]

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getHashtagBySlug(locale, slug),
  })

  const hashtag = queryClient.getQueryData<HashtagReturnType>(queryKey)

  if (!hashtag) {
    return { notFound: true }
  }

  const response = query.id
    ? await strapiRequest<Post>({
        endpoint: 'posts',
        id: Number(query.id),
      })
    : null

  const post = response?.data

  let seo = getPageSeo(hashtag, 'hashtags', locale)
  let capsSrc = ''

  if (post) {
    const title = post.description?.slice(0, 20) || ''
    const description = post.description || ''
    const image = post.image
    const src = getMediaUrl(image)

    const link = getItemLink(post, 'posts') as string

    if (post.caps) {
      capsSrc = getMediaUrl(post.caps)
    } else {
      capsSrc =
        SITE_URL +
        getOgImageSrc({
          ...post.imageParams,
          title: post.title,
          text: post.description || undefined,
          image: src,
          platform: post.hashtag?.platform?.slug as PlatformSlug,
        })
    }

    const images = image
      ? [
          {
            url: capsSrc,
            secureUrl: capsSrc,
            type: image.mime as string,
            width: 1200,
            height: 675,
            alt: title,
          },
        ]
      : undefined

    const twitterHandle = {
      en: '@TrendRights_EN',
      nl: '@TrendRights_NL',
      tr: '@TrendRights_TR',
    }

    seo = {
      title,
      description,
      twitter: {
        cardType: 'summary_large_image',
        site: twitterHandle[locale],
        handle: twitterHandle[locale],
      },
      openGraph: {
        title,
        description,
        url: link,
        images,
      },
    }
  }

  const userAgent = req.headers['user-agent'] as string
  const isIOS = /iPad|iPhone|iPod/.test(userAgent)
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent)
  const isIosSafari = isIOS && isSafari

  await queryClient.prefetchQuery({
    queryKey: ['kv-hashtag-sentences', hashtag.id],
    queryFn: () => getHashtagSentences(hashtag.id),
    staleTime: 1000 * 60,
  })

  const slugs = getLocalizedSlugs(hashtag, locale)

  const source = await serialize(hashtag.content || '')

  return {
    props: {
      seo,
      capsSrc: capsSrc || null,
      post: post || null,
      isIosSafari,
      slugs,
      source,
      hasStarted: hashtag.hasStarted,
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}
