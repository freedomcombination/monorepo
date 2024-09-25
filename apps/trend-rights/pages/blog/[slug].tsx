import { FC } from 'react'

import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { serialize } from 'next-mdx-remote/serialize'

import { SITE_URL } from '@fc/config/constants'
import { getSession } from '@fc/secrets'
import { getAuthorBlogs } from '@fc/services/blog/getAuthorBlogs'
import { getBlogBySlug } from '@fc/services/blog/getBlogBySlug'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Blog, StrapiLocale } from '@fc/types'
import { BlogDetail } from '@fc/ui/components/BlogDetail'
import { Container } from '@fc/ui/components/Container'
import { getPageSeo } from '@fc/utils/getPageSeo'

import { Layout } from '../../components/Layout'

type BlogPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const BlogDetailPage: FC<BlogPageProps> = ({ seo, authorBlogs, source }) => {
  const {
    locale,
    query: { slug },
  } = useRouter()

  const link = `${SITE_URL}/${locale}/blog/${slug}`

  if (!source) return null

  return (
    <Layout seo={seo}>
      <Container maxW="container.md">
        <BlogDetail source={source} link={link} authorBlogs={authorBlogs} />
      </Container>
    </Layout>
  )
}

export default BlogDetailPage

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient()

  const locale = context.locale as StrapiLocale
  const slug = context.params?.['slug'] as string
  const queryKey = ['blog', locale, slug]

  const { token } = await getSession(context.req, context.res)

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getBlogBySlug(slug, token),
  })

  const blogResponse = queryClient.getQueryData<{ data: Blog }>(queryKey)

  const blog = blogResponse?.data

  if (!blog) return { notFound: true }

  const authorBlogs =
    (await getAuthorBlogs(
      locale,
      blog?.author?.id as number,
      blog.id,
      token,
    )) || []

  const source = await serialize(blog?.content || '')

  const seo = getPageSeo(blog, 'blogs', locale)

  return {
    props: {
      seo,
      source,
      authorBlogs,
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}
