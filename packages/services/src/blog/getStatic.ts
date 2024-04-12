import { QueryClient } from '@tanstack/react-query'
import { GetStaticPropsContext } from 'next/types'

import { SITE_URL } from '@fc/config'
import { Blog, StrapiLocale } from '@fc/types'
import { mapStrapiFileToOgImages } from '@fc/utils'

import { getAuthorBlogs } from './get'
import { getBlogBySlug } from './getBlogBySlug'

export const getBlogStaticProps = async (context: GetStaticPropsContext) => {
  const queryClient = new QueryClient()

  const locale = context.locale as StrapiLocale
  const slug = context.params?.['slug'] as string

  await queryClient.prefetchQuery({
    queryKey: ['blog', locale, slug],
    queryFn: () => getBlogBySlug(locale, slug),
  })

  const blog = queryClient.getQueryData<Blog>(['blog', locale, slug])

  if (!blog) return { notFound: true }

  const title = blog?.title || ''
  const description = blog?.description || ''
  const siteUrl = SITE_URL
  const image = blog.image
  const url = `${siteUrl}/${locale}/blog/${locale}`

  const authorBlogs =
    (await getAuthorBlogs(locale, blog?.author?.id as number, blog.id)) || []

  const seo = {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      article: {
        publishedTime: blog.publishedAt,
        modifiedTime: blog.updatedAt,
        authors: [blog?.author?.name || blog?.author?.email || ''],
      },
      images: mapStrapiFileToOgImages(image, title),
    },
  }

  return {
    blog,
    authorBlogs,
    seo,
    queryClient,
  }
}
