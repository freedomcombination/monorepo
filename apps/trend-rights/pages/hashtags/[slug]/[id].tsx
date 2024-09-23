import { GetServerSidePropsContext } from 'next'

import { strapiRequest } from '@fc/lib/request'
import type { Post, StrapiLocale } from '@fc/types'

const Page = () => null

export default Page

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  const id = context.params?.id as string

  const response = await strapiRequest<Post>({
    endpoint: 'posts',
    id: Number(id),
  })

  const post = response.data

  if (!post?.hashtag) {
    return { notFound: true }
  }

  const destination = `/${locale}/hashtags/${post.hashtag.slug}?id=${post.id}`

  // We don't need to use a dynamic page just for a single post.
  // It's probably best to keep this page for a while because we shared latest hashtags with this url.
  // We will remove this page when we are sure that we don't need it anymore.
  return {
    redirect: {
      destination,
    },
  }
}
