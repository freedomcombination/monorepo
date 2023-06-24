import { GetServerSidePropsContext } from 'next'

import { getModelById } from '@wsvvrijheid/services'
import { Post, StrapiLocale } from '@wsvvrijheid/types'

const Page = () => null

export default Page

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  const id = context.params?.id as string

  const post = await getModelById<Post>({
    url: 'api/posts',
    id: Number(id),
  })

  if (!post) {
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
