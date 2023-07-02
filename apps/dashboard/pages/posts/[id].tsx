import { FC } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { i18nConfig } from '@wsvvrijheid/config'
import { useModelById } from '@wsvvrijheid/services'
import { HashtagReturnType, Post, StrapiLocale } from '@wsvvrijheid/types'
import {
  AdminLayout,
  FormLocaleSwitcher,
  ModelEditForm,
  PageHeader,
  PostSentenceForm,
  postFields,
  postSchema,
} from '@wsvvrijheid/ui'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const PostPage: FC<PageProps> = ({ seo }) => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const {
    data: post,
    isLoading,
    refetch,
  } = useModelById<Post>({
    url: 'api/posts',
    id,
  })

  return (
    <AdminLayout seo={seo} isLoading={isLoading} hasBackButton>
      <PageHeader>
        {post?.localizations && (
          <FormLocaleSwitcher models={post?.localizations} slug={'posts'} />
        )}
      </PageHeader>
      <Stack spacing={4}>
        {post && (
          <Box p={4} rounded="md" bg="white" shadow="md">
            <ModelEditForm<Post>
              url="api/posts"
              model={post}
              schema={postSchema}
              translatedFields={['description', 'content']}
              fields={postFields}
              onSuccess={refetch}
              approverRoles={['accountmanager', 'translator']}
              editorRoles={['contentmanager', 'translator', 'accountmanager']}
              publisherRoles={['contentmanager', 'accountmanager']}
            />
          </Box>
        )}
        {post?.hashtag && (
          <Box p={4} rounded="md" bg="white" shadow="md">
            <PostSentenceForm
              id={id}
              hashtag={post.hashtag as HashtagReturnType}
            />
          </Box>
        )}
      </Stack>
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Post',
    tr: 'Post',
    nl: 'Post',
  }

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      ...(await serverSideTranslations(
        locale,
        ['common', 'admin'],
        i18nConfig,
      )),
    },
  }
}

export default PostPage
