import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { getSession } from '@fc/secrets'
import { getBlogs, useGetCategoriesBlogs } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'

import { Layout } from '../../components'
import { WhyWeAre } from '../../components/WhyWeAre'

const Blogs = () => {
  const { t } = useTranslation()

  const categories = {
    'our-story': t('trend-rights.our-story'),
    documentaries: t('trend-rights.documentaries'),
    'global-activities': t('trend-rights.global-activites'),
    books: t('trend-rights.books'),
  }
  const categorySlugs = Object.keys(categories)

  const { data: blogs } = useGetCategoriesBlogs(categorySlugs)
  const { locale } = useRouter()

  const blogCategories = Array.from(
    new Set(
      blogs
        ?.filter(blog => blog?.categories && blog.categories.length > 0)
        .flatMap(
          blog =>
            blog.categories?.map(category => category[`name_${locale}`]) || [],
        ),
    ),
  )

  const titles = {
    en: 'Why are we here',
    nl: 'Waarom zijn we hier',
    tr: 'Neden buradayız',
  }
  const title = titles[locale] || titles['en']

  return (
    <Layout seo={{ title }} isDark={!!blogs?.length}>
      <WhyWeAre
        blogs={blogs || []}
        seo={{ title }}
        categories={blogCategories}
      />
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
