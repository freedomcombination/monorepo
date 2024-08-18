import { useEffect, useState } from 'react'

import { useUpdateEffect } from '@chakra-ui/hooks'
import { MenuItem } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

import { useStrapiRequest } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { ApprovalStatus, Art, Sort, StrapiLocale } from '@fc/types'
import { AdminLayout, ArtsTable, PageHeader } from '@fc/ui'

const ArtsPage = () => {
  const { query } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [searchTerm, setSearchTerm] = useState<string>()
  const { t } = useTranslation()

  // Client side query params (?status=pending)
  const status = query.status as ApprovalStatus

  const [sort, setSort] = useState<Sort>()

  const { locale } = useRouter()

  const artsQuery = useStrapiRequest<Art>({
    endpoint: 'arts',
    populate: [
      'artist.user.avatar',
      'categories',
      'image',
      'likers',
      'localizations',
    ],
    page: currentPage || 1,
    pageSize,
    filters: {
      ...(status ? { approvalStatus: { $eq: status } } : {}),
      ...(searchTerm && { [`title_${locale}`]: { $containsi: searchTerm } }),
    },
    includeDrafts: true,
    sort,
    locale,
  })

  useEffect(() => setCurrentPage(1), [status])

  const handleSearch = (search?: string) => {
    setSearchTerm(search || undefined)
  }

  useUpdateEffect(() => {
    artsQuery.refetch()
  }, [locale, searchTerm, sort, status])

  const arts = artsQuery?.data?.data
  const pageCount = artsQuery?.data?.meta?.pagination?.pageCount || 0
  const totalCount = artsQuery?.data?.meta?.pagination?.total || 0

  const mappedArts = arts?.map(art => {
    const translates = []

    if (art.title_en) translates.push('en')
    if (art.title_tr) translates.push('tr')
    if (art.title_nl) translates.push('nl')

    return {
      ...art,
      translates,
    }
  }) as Art[]

  return (
    <AdminLayout seo={{ title: t('arts') }}>
      <PageHeader
        onSearch={handleSearch}
        sortMenu={[
          <MenuItem key="asc" icon={<FaArrowUp />}>
            Name Asc
          </MenuItem>,
          <MenuItem key="desc" icon={<FaArrowDown />}>
            Name Desc
          </MenuItem>,
        ]}
      />
      <ArtsTable
        currentPage={currentPage}
        data={mappedArts}
        onSort={setSort}
        onSuccess={artsQuery.refetch}
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

export default ArtsPage
