import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { AdminLayout, NotFound } from '@fc/ui'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <AdminLayout seo={{ title: t('not-found') }}>
      <NotFound />
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

export default NotFoundPage
