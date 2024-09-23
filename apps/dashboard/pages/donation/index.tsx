import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'

import { strapiRequest } from '@fc/lib/request'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Platform, StrapiLocale } from '@fc/types'
import { AdminLayout } from '@fc/ui/components/AdminLayout'
import { DonationTemplate } from '@fc/ui/components/DonationTemplate'

type DonationPageProps = InferGetStaticPropsType<typeof getStaticProps>

const DonationPage: FC<DonationPageProps> = ({ platforms }) => {
  const { t } = useTranslation()

  return (
    <AdminLayout seo={{ title: t('donation.title') }}>
      <DonationTemplate platforms={platforms.data} />
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const platforms = await strapiRequest<Platform>({
    endpoint: 'platforms',
    locale,
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
