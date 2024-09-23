import { dehydrate } from '@tanstack/react-query'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { getClubQueryClient } from '@fc/services/art/getClubQueryClient'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale } from '@fc/types'
import { ArtClubTemplate } from '@fc/ui/components/ArtClubTemplate'

import { Layout } from '../../../components'

const ClubPage = () => {
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('art-stop') }}>
      <ArtClubTemplate />
    </Layout>
  )
}
export default ClubPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale
  const queryClient = await getClubQueryClient(context)

  return {
    props: {
      ...(await ssrTranslations(locale)),
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  }
}
