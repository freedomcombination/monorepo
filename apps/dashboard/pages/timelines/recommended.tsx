import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { RecommendedTweet, StrapiLocale } from '@fc/types'
import { AdminLayout } from '@fc/ui/components/AdminLayout'
import { MasonryGrid } from '@fc/ui/components/MasonryGrid'
import { RecommendedTweetCard } from '@fc/ui/components/RecommendedTweetCard'

const RecommendedTweetPage = () => {
  const { locale } = useRouter()

  const { t } = useTranslation()

  const { data: tweets, isLoading } = useStrapiRequest<RecommendedTweet>({
    endpoint: 'recommended-tweets',
    locale,
  })

  return (
    <AdminLayout seo={{ title: t('recommended-tweets') }} isLoading={isLoading}>
      <MasonryGrid cols={[1, 1, 1, 2, 3, 4]}>
        {tweets?.data?.map((tweet, key) => (
          <RecommendedTweetCard tweet={tweet} key={key} />
        ))}
      </MasonryGrid>
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default RecommendedTweetPage
