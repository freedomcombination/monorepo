import { FC, useMemo, useState } from 'react'

import {
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import {
  searchModel,
  SearchModelArgs,
  useSearchModel,
} from '@wsvvrijheid/services'
import {
  AccountStats as AccounStatsType,
  AccountStatsBase,
} from '@wsvvrijheid/types'
import { AccountStats, AdminLayout, PageHeader } from '@wsvvrijheid/ui'

import i18nConfig from '../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const args: SearchModelArgs<AccounStatsType> = {
  url: 'api/account-statistics',
  sort: ['date:asc'],
  pageSize: 100,
}

const Index: FC<PageProps> = ({ seo }) => {
  // TODO: Add pagination with keep previous data
  // Strapi fetches at max 100 items
  const statsQuery = useSearchModel(args)

  const statsData = [
    'tweets',
    'replies',
    'retweets',
    'likes',
    'followers',
    'followings',
  ]

  const stats = useMemo(
    () => statsQuery.data?.data ?? ([] as AccounStatsType[]),
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
    <AdminLayout seo={seo}>
      <PageHeader>
        <CheckboxGroup
          defaultValue={accounts}
          value={selectedAccounts}
          onChange={selected => {
            setSelectedAccounts(selected as string[])
          }}
        >
          <Wrap>
            {accounts?.map((account, index) => {
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
  )
}

export const getStaticProps = async context => {
  const { locale } = context

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['account-stats'], () => {
    return searchModel<AccounStatsType>(args)
  })

  const title = {
    en: 'Home',
    tr: 'Anasayfa',
    nl: 'Home',
  }

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(
        locale,
        ['common', 'admin'],
        i18nConfig,
      )),
    },
    revalidate: 1,
  }
}

export default Index
