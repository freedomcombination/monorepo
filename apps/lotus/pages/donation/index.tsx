import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'

import { strapiRequest } from '@fc/services/common/request'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Platform, StrapiLocale } from '@fc/types'
import { DonationTemplate } from '@fc/ui/components/DonationTemplate'

import { Layout } from '../../components/Layout'

type DonationPageProps = InferGetStaticPropsType<typeof getStaticProps>

const DonationPage: FC<DonationPageProps> = ({ platforms }) => {
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('donation.title') }}>
      <DonationTemplate platforms={platforms.data} />
    </Layout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const platforms = await strapiRequest<Platform>({
    endpoint: 'platforms',
  })

  return {
    props: {
      ...(await ssrTranslations(locale)),
      platforms,
    },
    revalidate: 1,
  }
}

export default DonationPage
