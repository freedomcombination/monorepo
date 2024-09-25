import { useState } from 'react'

import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale } from '@fc/types'
import { AdminLayout } from '@fc/ui/components/AdminLayout'
import { PageHeader } from '@fc/ui/components/PageHeader'
import { TranslateLocales } from '@fc/ui/components/TranslateLocales'

const ActivitiesTranslatePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>()
  const { t } = useTranslation()

  const handleSearch = (search?: string) => {
    setSearchTerm(search || undefined)
  }

  return (
    <AdminLayout seo={{ title: t('translates') }}>
      <PageHeader onSearch={handleSearch} />
      <TranslateLocales searchTerm={searchTerm} />
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

export default ActivitiesTranslatePage
