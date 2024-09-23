import { useState } from 'react'

import { useUpdateEffect } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@fc/services/common/request'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Course, Sort, StrapiLocale } from '@fc/types'
import { AdminLayout } from '@fc/ui/components/AdminLayout'
import { DataTable } from '@fc/ui/components/DataTable'
import { PageHeader } from '@fc/ui/components/PageHeader'
import { useColumns } from '@fc/ui/hooks/useColumns'

const CoursesPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [searchTerm, setSearchTerm] = useState<string>()

  const { t } = useTranslation()

  const [sort, setSort] = useState<Sort>()
  const router = useRouter()
  const { locale } = useRouter()

  const columns = useColumns<Course>()

  const coursesQuery = useStrapiRequest<Course>({
    endpoint: 'courses',
    populate: ['categories', 'tags', 'platforms', 'image', 'applications'],
    page: currentPage || 1,
    pageSize,
    filters: {
      ...(searchTerm && { [`title_${locale}`]: { $containsi: searchTerm } }),
    },
    sort,
    locale,
    includeDrafts: true,
  })

  const handleSearch = (search?: string) => {
    setSearchTerm(search || undefined)
  }

  useUpdateEffect(() => {
    coursesQuery.refetch()
  }, [locale, searchTerm, sort])

  const courses = coursesQuery?.data?.data
  const pageCount = coursesQuery?.data?.meta?.pagination?.pageCount || 0
  const totalCount = coursesQuery?.data?.meta?.pagination?.total || 0

  const mappedCourses =
    courses?.map(course => {
      const translates = []

      if (course.title_en) translates.push('en')
      if (course.title_tr) translates.push('tr')
      if (course.title_nl) translates.push('nl')

      return {
        ...course,
        translates,
      }
    }) || []

  const handleRowClick = (index: number, id: number) => {
    router.push(`/courses/${id}`)
  }

  return (
    <AdminLayout seo={{ title: t('courses') }}>
      <PageHeader onSearch={handleSearch} />

      <DataTable<Course>
        columns={columns.courses!}
        currentPage={currentPage}
        data={mappedCourses as Course[]}
        onClickRow={handleRowClick}
        onSort={setSort}
        pageCount={pageCount}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        totalCount={totalCount}
        allowExportPDF
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

export default CoursesPage
