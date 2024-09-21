import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { useLocalStorage } from 'usehooks-ts'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale, Tweet } from '@fc/types'
import { AdminLayout } from '@fc/ui/components/AdminLayout'
import { Container } from '@fc/ui/components/Container'
import { MasonryGrid } from '@fc/ui/components/MasonryGrid'
import { TweetCard } from '@fc/ui/components/TweetCard'

const TweetBookmarkedPage = () => {
  const [storageTweets] = useLocalStorage<Tweet[]>('bookmarked-tweets', [])

  const { t } = useTranslation()

  return (
    <AdminLayout seo={{ title: t('bookmarked-tweets') }}>
      <Container>
        <MasonryGrid cols={[1, 1, 1, 2, 3]}>
          {storageTweets?.map((tweet, key) => (
            <TweetCard tweet={tweet} key={key} editable />
          ))}
        </MasonryGrid>
      </Container>
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

export default TweetBookmarkedPage
