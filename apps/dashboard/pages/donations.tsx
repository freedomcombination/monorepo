import { useState } from 'react'

import { useUpdateEffect, Box, Text, Flex } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Donation, DonationStatus, Sort, StrapiLocale } from '@fc/types'
import { AdminLayout } from '@fc/ui/components/AdminLayout'
import { DataTable } from '@fc/ui/components/DataTable'
import { ModelStatusFilters } from '@fc/ui/components/ModelStatusFilters'
import { MonthPicker } from '@fc/ui/components/MonthPicker'
import { RangeParams } from '@fc/ui/components/MonthPicker/types'
import { PageHeader } from '@fc/ui/components/PageHeader'
import { useChangeParams } from '@fc/ui/hooks'
import { useColumns } from '@fc/ui/hooks/useColumns'

const DonationsPage = () => {
  const { t } = useTranslation()
  const { locale, query } = useRouter()

  const { changeParams, changePage, changeSearch } = useChangeParams()

  const [searchTerm, setSearchTerm] = useState<string>()
  const [defaultValue, setDefaultValue] = useState<string>('paid')
  const [date, setDate] = useState<RangeParams>()
  const [sort, setSort] = useState<Sort | undefined>(['createdAt:desc'])

  const status = query.status as DonationStatus | 'all'

  const columns = useColumns<Donation>()

  const startDate =
    date && new Date(date.startYear, date.startMonth).toISOString()

  const endDate = date && new Date(date.endYear, date.endMonth).toISOString()

  const donationsQuery = useStrapiRequest<Donation>({
    endpoint: 'donates',
    page: query.page ? parseInt(query.page as string) : 1,
    pageSize: query.pageSize ? parseInt(query.pageSize as string) : 50,
    filters: {
      ...(searchTerm && { email: { $containsi: searchTerm } }),
      ...(date && {
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      }),
      status: defaultValue === 'all' ? {} : { $eq: defaultValue },
    },
    sort,
  })

  const donations = donationsQuery?.data?.data as Donation[]
  const pageCount = donationsQuery?.data?.meta?.pagination?.pageCount || 0
  const totalCount = donationsQuery?.data?.meta?.pagination?.total || 0

  const totalAmount =
    donations &&
    donations.reduce((acc, donation) => {
      return acc + (donation.amount || 0)
    }, 0)

  const handleSearch = (search?: string) => {
    setSearchTerm(search || undefined)
    changeSearch(search)
  }

  const handleSelect = (selectedDate?: RangeParams) => {
    setDate(selectedDate || undefined)

    if (selectedDate) {
      const startDate = new Date(
        selectedDate.startYear,
        selectedDate.startMonth,
      ).toISOString()
      const endDate = new Date(
        selectedDate.endYear,
        selectedDate.endMonth,
      ).toISOString()
      changeParams({ startDate, endDate })
    } else {
      changeParams({ startDate: undefined, endDate: undefined })
    }
  }

  const handleClear = () => {
    setDate(undefined)
    changeParams({ date: undefined })
  }

  const setDonationStatus = (status: string) => {
    setDefaultValue(status)
    changeParams({ status })
  }

  useUpdateEffect(() => {
    donationsQuery.refetch()
  }, [locale, searchTerm, sort])

  return (
    <AdminLayout seo={{ title: t('donations') }}>
      <PageHeader
        onSearch={handleSearch}
        filterMenu={
          <ModelStatusFilters
            args={[
              {
                statuses: ['all', 'paid', 'unpaid', 'canceled', 'expired'],
                defaultValue,
                currentValue: status,
                setCurrentValue: setDonationStatus,
                title: 'status',
              },
            ]}
          />
        }
      >
        <MonthPicker onClear={handleClear} onRangeSelect={handleSelect} />
      </PageHeader>

      <DataTable<Donation>
        columns={columns.donates!}
        currentPage={query.page ? parseInt(query.page as string) : 1}
        data={donations}
        onSort={setSort}
        pageCount={pageCount}
        pageSize={query.pageSize ? parseInt(query.pageSize as string) : 50}
        setCurrentPage={page => changePage(page)}
        setPageSize={size => changeParams({ pageSize: size })}
        totalCount={totalCount as number}
      >
        {donations && (
          <Flex justify={'end'}>
            <Box paddingY={2} paddingX={5} bg="white" shadow="base">
              {t('total')}: <Text as="b">{totalAmount.toFixed(2)} €</Text>
            </Box>
          </Flex>
        )}
      </DataTable>
    </AdminLayout>
  )
}

export default DonationsPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}
