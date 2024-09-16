import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { getSession } from '@fc/secrets'
import { getCategorizedBlogs, useGetCategorizedBlogs } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'

import { Layout, WhyWeAre } from '../../components'

const Blogs = () => {
  const { locale } = useRouter()
  const { data: blogs } = useGetCategorizedBlogs()

  const titles = {
    en: 'Why are we here',
    nl: 'Waarom zijn we hier',
    tr: 'Neden buradayız',
  }
  const title = titles[locale] || titles['en']

  return (
    <Layout seo={{ title }} isDark={!!blogs?.length}>
      <WhyWeAre blogs={blogs || []} seo={{ title }} />
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
    queryKey: ['categorized-blogs', locale],
    queryFn: () => getCategorizedBlogs(locale, token),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}
