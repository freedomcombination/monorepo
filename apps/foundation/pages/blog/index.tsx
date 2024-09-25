import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { getSession } from '@fc/secrets'
import { getBlogs, useBlogs } from '@fc/services/blog/getBlogs'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale } from '@fc/types'
import { BlogTemplate } from '@fc/ui/components/BlogTemplate'

import { Layout } from '../../components/Layout'

// TODO: Implement author filter
const Blogs = () => {
  const { data: blogs = [] } = useBlogs()

  const { t } = useTranslation()

  const title = t('blogs')

  return (
    <Layout seo={{ title }} isDark={!!blogs?.length}>
      <BlogTemplate blogs={blogs} seo={{ title }} />
    </Layout>
  )
}

export default Blogs

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient()

  const locale = context.locale as StrapiLocale
  const { token } = await getSession(context.req, context.res)

  await queryClient.prefetchQuery({
    queryKey: ['blogs', locale],
    queryFn: () => getBlogs(locale, token),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}
