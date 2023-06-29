import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { getBlogs, useGetBlogs } from '@wsvvrijheid/services'
import { StrapiLocale } from '@wsvvrijheid/types'
import { BlogTemplate } from '@wsvvrijheid/ui'

import { Layout } from '../../components'
import i18nConfig from '../../next-i18next.config'

type BlogsProps = InferGetStaticPropsType<typeof getStaticProps>

// TODO: Implement author filter
const Blogs: FC<BlogsProps> = ({ seo }) => {
  const { data: blogs = [] } = useGetBlogs()

  return (
    <Layout seo={seo} isDark>
      <BlogTemplate blogs={blogs} seo={seo} />
    </Layout>
  )
}

export default Blogs

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const queryClient = new QueryClient()

  const locale = context.locale as StrapiLocale

  await queryClient.prefetchQuery({
    queryKey: ['blogs', locale],
    queryFn: () => getBlogs(locale),
  })

  const blogSeo = {
    en: {
      title: 'Blog',
      description: 'Posts',
    },
    nl: {
      title: 'Blog',
      description: 'Posts',
    },
    tr: {
      title: 'Blog',
      description: 'Yazılar',
    },
  }

  const seo = blogSeo[locale]

  return {
    props: {
      seo,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: 1,
  }
}
