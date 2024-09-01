import { useState } from 'react'

import { useUpdateEffect } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { Asset, Sort, StrapiLocale } from '@fc/types'
import { AdminLayout, DataTable, PageHeader, useColumns } from '@fc/ui'
import { formatPrice } from '@fc/utils'

const AssetsPage = () => {
  const { locale, query, push } = useRouter()
  const { t } = useTranslation()
  const router = useRouter()
  const sort = query.sort as Sort
  const currentPage = query.page ? parseInt(query.page as string) : 1
  const pageSize = query.pageSize ? parseInt(query.pageSize as string) : 20

  const [searchTerm, setSearchTerm] = useState<string>()

  const columns = useColumns<Asset>()

  const assetsQuery = useStrapiRequest<Asset>({
    endpoint: 'assets',
    page: currentPage || 1,
    pageSize,
    filters: {
      ...(searchTerm && { [`title_${locale}`]: { $containsi: searchTerm } }),
    },
    sort,
    locale,
  })

  const handleSearch = (search?: string) => {
    setSearchTerm(search || undefined)
  }

  useUpdateEffect(() => {
    assetsQuery.refetch()
  }, [locale, searchTerm, sort])

  const assets = assetsQuery?.data?.data
  const pageCount = assetsQuery?.data?.meta?.pagination?.pageCount || 0
  const totalCount = assetsQuery?.data?.meta?.pagination?.total || 0

  const changeRoute = (
    key: 'id' | 'page' | 'sort' | 'status' | 'published' | 'q' | 'pageSize',
    value?: string | number | Sort,
  ) => {
    if (
      !value ||
      (key === 'page' && value === 1) ||
      (key === 'status' && value === 'all') ||
      (key === 'published' && value === 'all') ||
      (key === 'pageSize' && value === 20)
    ) {
      const _query = { ...query }
      delete _query[key]
      push({ query: _query }, undefined, { shallow: true })

      return
    }

    push({ query: { ...query, [key]: value } }, undefined, { shallow: true })
  }
  const setCurrentPage = (page?: number) => changeRoute('page', page)
  const setPageSize = (size?: number) => changeRoute('pageSize', size)
  const setSort = (sort?: Sort) => changeRoute('sort', sort)

  const handleRowClick = (index: number, id: number) => {
    router.push(`/assets/${id}`)
  }

  return (
    <AdminLayout seo={{ title: t('foundation.assets') }}>
      <PageHeader onSearch={handleSearch} />

      <DataTable<Asset>
        columns={columns.assets!}
        currentPage={currentPage}
        data={assets as Asset[]}
        onClickRow={handleRowClick}
        onSort={setSort}
        pageCount={pageCount}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        totalCount={totalCount}
        allowExportPDF
        badges={{
          badgeText(data) {
            const totalPrice = data.reduce((acc, curr) => acc + curr.price, 0)

            return t('items-asset-total', { amount: formatPrice(totalPrice) })
          },
        }}
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
