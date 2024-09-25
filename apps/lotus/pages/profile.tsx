import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale } from '@fc/types'
import { ProfilePanel } from '@fc/ui/components/ProfileSettings'

import { Layout } from '../components'

const Profile = () => {
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('profile') }}>
      <ProfilePanel />
    </Layout>
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

export default Profile
