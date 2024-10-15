import { GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale } from '@fc/types'
import { AdminLayout } from '@fc/ui/components/AdminLayout'
import { ArchiveContentAssistant } from '@fc/ui/components/ArchiveContentAssistant'

const ArchiveAssistantPage = () => {
  const { t } = useTranslation()

  return (
    <AdminLayout seo={{ title: t('archive-creation') }}>
      <ArchiveContentAssistant />
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default ArchiveAssistantPage
