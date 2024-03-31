import { FC, useEffect } from 'react'

import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { ASSETS_URL, SITE_URL } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { strapiRequest } from '@fc/lib'
import { getHashtagBySlug, getHashtagSentences, useHashtag } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { HashtagReturnType, Post, StrapiLocale } from '@fc/types'
import {
  Container,
  HashtagProvider,
  PostImage,
  PostMaker,
  TimeLeft,
} from '@fc/ui'
import {
  getItemLink,
  getLocalizedSlugs,
  getOgImageSrc,
  getPageSeo,
} from '@fc/utils'

import { Layout } from '../../../components'

type HashtagProps = InferGetServerSidePropsType<typeof getServerSideProps>

const HashtagPage: FC<HashtagProps> = ({
  hasStarted,
  seo,
  post,
  capsSrc,
  isIosSafari,
}) => {
  const hashtag = useHashtag()

  const { isOpen, onClose, onOpen } = useDisclosure()
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
        <Modal isCentered isOpen={isOpen} onClose={handleClose}>
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
    const title = post?.description?.slice(0, 20) || ''
    const description = post.description || ''
    const image = post?.image
    const caps = post?.caps?.url

    const src = image?.url
    const link = getItemLink(post, 'posts') as string

    if (caps) {
      capsSrc = `${ASSETS_URL}${caps}`
    } else {
      capsSrc =
        SITE_URL +
        getOgImageSrc({
          title: post.title,
          text: post.description || undefined,
          image: src ? `${ASSETS_URL}${src}` : undefined,
          ...post.imageParams,
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

  return {
    props: {
      seo,
      capsSrc: capsSrc || null,
      post: post || null,
      isIosSafari,
      slugs,
      hasStarted: hashtag.hasStarted,
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}
