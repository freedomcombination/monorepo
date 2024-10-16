import { useState } from 'react'

import { useUpdateEffect } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { Sort, StrapiLocale, Team } from '@fc/types'
import { AdminLayout } from '@fc/ui/components/AdminLayout'
import { DataTable } from '@fc/ui/components/DataTable'
import { PageHeader } from '@fc/ui/components/PageHeader'
import { useColumns } from '@fc/ui/hooks/useColumns'

const TeamsPage = () => {
  const { locale, query, push } = useRouter()
  const { t } = useTranslation()
  const router = useRouter()
  const sort = query.sort as Sort
  const currentPage = query.page ? parseInt(query.page as string) : 1
  const pageSize = query.pageSize ? parseInt(query.pageSize as string) : 20

  const [searchTerm, setSearchTerm] = useState<string>()

  const columns = useColumns<Team>()

  const teamsQuery = useStrapiRequest<Team>({
    endpoint: 'teams',
    page: currentPage || 1,
    pageSize,
    filters: {
      ...(searchTerm && { name: { $containsi: searchTerm } }),
    },
    sort,
    locale,
  })

  const handleSearch = (search?: string) => {
    setSearchTerm(search || undefined)
  }

  useUpdateEffect(() => {
    teamsQuery.refetch()
  }, [locale, searchTerm, sort])

  const teams = teamsQuery?.data?.data
  const pageCount = teamsQuery?.data?.meta?.pagination?.pageCount || 0
  const totalCount = teamsQuery?.data?.meta?.pagination?.total || 0

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
    router.push(`/teams/${id}`)
  }

  return (
    <AdminLayout seo={{ title: t('teams') }}>
      <PageHeader onSearch={handleSearch} />
      <DataTable<Team>
        columns={columns.teams!}
        currentPage={currentPage}
        data={teams as Team[]}
        onClickRow={handleRowClick}
        onSort={setSort}
        pageCount={pageCount}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        totalCount={totalCount}
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

export default TeamsPage
