import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { RequestCollectionArgs, strapiRequest } from '@fc/lib'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import {
  AccountStats,
  AccountStats as AccountStatsType,
  StrapiLocale,
} from '@fc/types'
import { AdminLayout, AuditLogTable } from '@fc/ui'

const args: RequestCollectionArgs<AccountStats> = {
  endpoint: 'account-statistics',
  sort: ['date:asc'],
  pageSize: 100,
}

const Index = () => {
  const { t } = useTranslation()

  return (
    <AdminLayout seo={{ title: t('home') }}>
      <AuditLogTable />
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['account-stats'],
    queryFn: () => strapiRequest<AccountStatsType>(args),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}

export default Index
