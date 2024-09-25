import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale } from '@fc/types'
import { JoinTemplate } from '@fc/ui/components/JoinTemplate'

import { Layout } from '../components'

const JoinPage = ({}) => {
  const { t } = useTranslation()

  const title = t('join-the-team')

  return (
    <Layout seo={{ title }}>
      <JoinTemplate title={title} />
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

export default JoinPage
