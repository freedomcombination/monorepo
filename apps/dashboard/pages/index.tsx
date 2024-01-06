import { Center, Heading } from '@chakra-ui/react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { useAuthContext } from '@wsvvrijheid/context'
import { RequestCollectionArgs, strapiRequest } from '@wsvvrijheid/lib'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import {
  AccountStats,
  AccountStats as AccountStatsType,
  StrapiLocale,
} from '@wsvvrijheid/types'
import { AdminLayout } from '@wsvvrijheid/ui'

const args: RequestCollectionArgs<AccountStats> = {
  endpoint: 'account-statistics',
  sort: ['date:asc'],
  pageSize: 100,
}

const Index = () => {
  const { t } = useTranslation()
  const { user, profile } = useAuthContext()

  return (
    <>
      <AdminLayout seo={{ title: t('home') }}>
        <Center minH={'50vh'}>
          <Heading as={'h1'}>
            {t('welcome')}
            {(user || profile) && ` ${profile?.name || user?.username}`}
          </Heading>
        </Center>
      </AdminLayout>
    </>
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
