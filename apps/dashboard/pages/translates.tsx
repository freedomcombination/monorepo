import { useEffect } from 'react'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useUpdateEffect,
} from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type {
  Activity,
  ApprovalStatus,
  Sort,
  StrapiCollectionEndpoint,
  StrapiLocale,
  StrapiModel,
} from '@fc/types'
import { AdminLayout } from '@fc/ui/components/AdminLayout'
import { DataTable } from '@fc/ui/components/DataTable'
import { ModelEditTranslate } from '@fc/ui/components/ModelEditTranslate'
import { PageHeader } from '@fc/ui/components/PageHeader'
import type { WTableProps } from '@fc/ui/components/WTable'
import { useChangeParams } from '@fc/ui/hooks'
import { useColumns } from '@fc/ui/hooks/useColumns'
import { useFields } from '@fc/ui/hooks/useFields'
import { useSchema } from '@fc/ui/hooks/useSchema'

const ActivitiesTranslatePage = () => {
  const { t } = useTranslation()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const { query, locale, push } = useRouter()

  const id = Number(query.id as string)

  const modelColumns = useColumns()
  const modelFields = useFields()
  const modelSchemas = useSchema()

  const { changeParams, changePage, changeSearch } = useChangeParams()

  const currentPage = query.page ? parseInt(query.page as string) : 1
  const pageSize = query.pageSize ? parseInt(query.pageSize as string) : 20
  const sort = query.sort as Sort
  const status = query.status as ApprovalStatus
  const slug = query.slug as Partial<StrapiCollectionEndpoint>
  const translateKey = slug as any

  const handleSearch = (search?: string) => {
    changeSearch(search)
  }

  useEffect(() => {
    changePage(1)
  }, [status])

  useUpdateEffect(() => {
    dataQuery.refetch()
  }, [locale, query.q, sort, status])

  const dataQuery = useStrapiRequest<Activity>({
    endpoint: slug,
    page: currentPage || 1,
    pageSize,
    filters: {
      ...(query.q && {
        $or: [
          { title: { $containsi: query.q } },
          { description: { $containsi: query.q } },
        ],
      }),
      approvalStatus: { $eq: 'pending' },
    },
    sort,
    locale,
    includeDrafts: true,
    queryOptions: {
      enabled: !!slug,
    },
  })

  const items = dataQuery?.data?.data
  const pageCount = dataQuery?.data?.meta?.pagination?.pageCount || 0
  const totalCount = dataQuery?.data?.meta?.pagination?.total || 0

  const mappedModels =
    items?.map(item => ({
      ...item,
      translates: item.localizations?.map(l => l.locale),
    })) || []

  const handleClick = (index: number, id: number) => {
    onOpen()
    push({ query: { ...query, id } })
  }

  const handleClose = () => {
    onClose()
    if (query.id) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...q } = query
      push({ query: q }, undefined, { shallow: true })
    }
  }

  const columns = modelColumns[slug]
  const fields =
    slug === 'posts'
      ? modelFields['translate-post-model']
      : modelFields['translate-model']
  const schema =
    slug === 'posts'
      ? modelSchemas['translate-post-model']
      : modelSchemas['translate-model']

  return (
    <AdminLayout seo={{ title: t(translateKey || 'translates') }}>
      <PageHeader onSearch={handleSearch} />

      {mappedModels && (
        <DataTable<StrapiModel>
          columns={columns as WTableProps<StrapiModel>['columns']}
          currentPage={currentPage}
          data={mappedModels}
          onClickRow={handleClick}
          onSort={sort => changeParams({ sort })}
          pageCount={pageCount}
          pageSize={pageSize}
          setCurrentPage={page => changePage(page)}
          setPageSize={size => changeParams({ pageSize: size })}
          totalCount={totalCount}
        />
      )}
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={handleClose}
        size={'4xl'}
        scrollBehavior={'inside'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0} h={'80vh'}>
            <ModelEditTranslate
              id={id}
              endpoint={slug}
              translatedFields={fields?.map(f => f.name) || []}
              schema={schema!}
              fields={fields!}
              onSuccess={dataQuery.refetch}
            >
              <Button onClick={handleClose} colorScheme={'gray'}>
                {t('dismiss')}
              </Button>
            </ModelEditTranslate>
          </ModalBody>
        </ModalContent>
      </Modal>
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

export default ActivitiesTranslatePage
