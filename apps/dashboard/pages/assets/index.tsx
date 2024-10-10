import { useState } from 'react'

import { useUpdateEffect } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Asset, Sort, StrapiLocale } from '@fc/types'
import { AdminLayout } from '@fc/ui/components/AdminLayout'
import { DataTable } from '@fc/ui/components/DataTable'
import { PageHeader } from '@fc/ui/components/PageHeader'
import { useChangeParams } from '@fc/ui/hooks'
import { useColumns } from '@fc/ui/hooks/useColumns'
import { formatPrice } from '@fc/utils/formatPrice'

const AssetsPage = () => {
  const { locale, query } = useRouter()
  const { t } = useTranslation()
  const columns = useColumns<Asset>()

  const currentPage = query.page ? parseInt(query.page as string) : 1
  const pageSize = query.pageSize ? parseInt(query.pageSize as string) : 20
  const sort = query.sort as Sort

  const [searchTerm, setSearchTerm] = useState<string>()

  const { changeParams, changePage, changeSearch } = useChangeParams()

  const assetsQuery = useStrapiRequest<Asset>({
    endpoint: 'assets',
    page: currentPage,
    pageSize,
    filters: {
      ...(searchTerm && { [`title_${locale}`]: { $containsi: searchTerm } }),
    },
    sort,
    locale,
  })

  const handleSearch = (search?: string) => {
    setSearchTerm(search || undefined)
    changeSearch(search)
  }

  useUpdateEffect(() => {
    assetsQuery.refetch()
  }, [locale, searchTerm, sort])

  const assets = assetsQuery?.data?.data
  const pageCount = assetsQuery?.data?.meta?.pagination?.pageCount || 0
  const totalCount = assetsQuery?.data?.meta?.pagination?.total || 0

  const useHandleRowClick = (index: number, id: number) => {
    useRouter().push(`/assets/${id}`)
  }

  return (
    <AdminLayout seo={{ title: t('foundation.assets') }}>
      <PageHeader onSearch={handleSearch} />

      <DataTable<Asset>
        columns={columns.assets!}
        currentPage={currentPage}
        data={assets as Asset[]}
        onClickRow={useHandleRowClick}
        onSort={(sort) => changeParams({ sort })}
        pageCount={pageCount}
        pageSize={pageSize}
        setCurrentPage={(page) => changePage(page)}
        setPageSize={(size) => changeParams({ pageSize: size })}
        totalCount={totalCount}
        allowExportPDF
        badges={[
          {
            badgeText(data) {
              const totalPrice = data.reduce((acc, curr) => acc + curr.price, 0)
              
              return t('items-asset-total', { amount: formatPrice(totalPrice) })
            },
          },
        ]}
      />
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

export default AssetsPage
