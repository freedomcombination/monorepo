import { FC } from 'react'

import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { NotFound } from '@fc/ui'

import { Layout } from '../components'
const NotFoundPage: FC = () => {
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('not-found') }}>
      <NotFound />
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

export default NotFoundPage
