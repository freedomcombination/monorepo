import { useMemo, useState } from 'react'

import {
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { RequestCollectionArgs, strapiRequest } from '@wsvvrijheid/lib'
import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import {
  AccountStatsBase,
  AccountStats as AccountStatsType,
  StrapiLocale,
} from '@wsvvrijheid/types'
import { AccountStats, AdminLayout, PageHeader } from '@wsvvrijheid/ui'

const args: RequestCollectionArgs = {
  endpoint: 'account-statistics',
  sort: ['date:asc'],
  pageSize: 100,
}

const Index = () => {
  const { t } = useTranslation()

  const statsQuery = useStrapiRequest<AccountStatsType>(args)
  const statsData = [
    'tweets',
    'replies',
    'retweets',
    'likes',
    'followers',
    'followings',
  ]

  const stats = useMemo(
    () => statsQuery.data?.data ?? ([] as AccountStatsType[]),
    [statsQuery.data?.data],
  )

  const accounts = stats
    .map(item => item.username?.toLowerCase())
    .filter((value, index, self) => self.indexOf(value) === index)

  const [selectedAccounts, setSelectedAccounts] = useState(accounts)

  const filteredStats = stats.filter(item =>
    selectedAccounts.includes(item.username?.toLowerCase()),
  )

  return (
    <>
      <AdminLayout seo={{ title: t('home') }}>
        <PageHeader>
          <CheckboxGroup
            defaultValue={accounts}
            value={selectedAccounts}
            onChange={selected => {
              setSelectedAccounts(selected as string[])
            }}
          >
            <Wrap>
              {accounts?.map(account => {
                const isSelected = selectedAccounts.includes(account)

                return (
                  <Checkbox
                    key={account}
                    variant={isSelected ? 'solid' : 'outline'}
                    colorScheme={isSelected ? 'primary' : 'gray'}
                    value={account}
                  >
                    {account}
                  </Checkbox>
                )
              })}
            </Wrap>
          </CheckboxGroup>
        </PageHeader>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
          {statsData?.map((field, index) => (
            <Stack key={index} p={4} bg={'white'} shadow={'md'} rounded={'md'}>
              <Text
                textAlign={'center'}
                textTransform={'capitalize'}
                fontWeight={700}
                fontSize={'lg'}
              >
                {field}
              </Text>
              {filteredStats && (
                <AccountStats
                  field={field as keyof AccountStatsBase}
                  stats={filteredStats}
                />
              )}
            </Stack>
          ))}
        </SimpleGrid>
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
