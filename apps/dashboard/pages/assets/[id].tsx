import { useEffect, useState } from 'react'

import { useDisclosure } from '@chakra-ui/hooks'
import { Accordion, Stack, Text } from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { TbActivity } from 'react-icons/tb'

import { useStrapiRequest } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { Asset, AssetsTracking, Sort, StrapiLocale } from '@fc/types'
import {
  AdminLayout,
  DataTable,
  ModelCreateModal,
  ModelEditForm,
  ModelEditModal,
  PageHeader,
  useColumns,
  useFields,
  useSchema,
} from '@fc/ui'

const AssetPage = () => {
  // const { t } = useTranslation()
  const schemas = useSchema()
  const fields = useFields()
  const { t } = useTranslation()
  const { open, onOpen, onClose } = useDisclosure()
  const { locale, query } = useRouter()

  const columns = useColumns<AssetsTracking>()

  const [selectedAssetsTrackingId, setSelectedAssetsTrackingId] =
    useState<number>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [searchTerm, setSearchTerm] = useState<string>()
  const [sort, setSort] = useState<Sort>()

  const handleSearch = (search?: string) => {
    setSearchTerm(search || undefined)
  }

  const id = Number(query.id as string)

  const assetsTrackingsQuery = useStrapiRequest<AssetsTracking>({
    endpoint: 'assets-trackings',
    filters: {
      $or: [
        { toLocation: { $containsi: searchTerm } },
        { fromLocation: { $containsi: searchTerm } },
        { assignedTo: { name: { $containsi: searchTerm } } },
      ],
      asset: { id: { $eq: id } },
    },
    sort,
    page: currentPage || 1,
    pageSize: 100,
    locale,
  })

  const assetsTrackings = assetsTrackingsQuery?.data?.data || []
  const pageCount = assetsTrackingsQuery?.data?.meta?.pagination?.pageCount || 0
  const totalCount = assetsTrackingsQuery?.data?.meta?.pagination?.total || 0

  const { data, isLoading, refetch } = useStrapiRequest<Asset>({
    endpoint: 'assets',
    id,
  })
  const asset = data?.data

  // assets trackings
  const handleRowClick = (index: number, id: number) => {
    setSelectedAssetsTrackingId(id)
  }

  useEffect(() => {
    if (selectedAssetsTrackingId) {
      onOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAssetsTrackingId])

  const handleClose = () => {
    onClose()
    setSelectedAssetsTrackingId(undefined)
  }

  return (
    <AdminLayout
      seo={{ title: t('foundation.assets') }}
      isLoading={isLoading}
      hasBackButton
    >
      {selectedAssetsTrackingId && (
        <ModelEditModal<AssetsTracking>
          title={'Assets Trackings'}
          endpoint="assets-trackings"
          id={selectedAssetsTrackingId}
          isOpen={open}
          onClose={handleClose}
          onSuccess={assetsTrackingsQuery.refetch}
          size={'5xl'}
        />
      )}
      <Stack gap={8} p={6}>
        <Accordion.Root
          size={'lg'}
          allowToggle
          allowMultiple={false}
          defaultIndex={0}
          borderColor="transparent"
          defaultValue={1}
        >
          <Accordion.Item _notLast={{ mb: 2 }}>
            <Accordion.ItemTrigger
              justifyContent="space-between"
              cursor="pointer"
              fontSize="lg"
              bg={'white'}
              rounded={'md'}
              fontWeight={600}
              shadow={'sm'}
            >
              <Text>{asset?.name}</Text>
              <Accordion.ItemIndicator ml={'auto'} />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent mt={4} bg={'white'} rounded={'md'}>
              {asset && (
                <ModelEditForm<Asset>
                  endpoint="assets"
                  model={asset}
                  onSuccess={refetch}
                />
              )}
            </Accordion.ItemContent>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.ItemTrigger
              justifyContent="space-between"
              _activeStep={{ bg: 'gray.200' }}
              cursor="pointer"
              fontSize="lg"
              bg={'white'}
              rounded={'md'}
              fontWeight={600}
              shadow={'sm'}
            >
              <Text>Asset Tracking</Text>
              <Accordion.ItemIndicator ml={'auto'} />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent mt={4} bg={'white'} rounded={'md'}>
              <PageHeader onSearch={handleSearch} />
              <DataTable<AssetsTracking>
                columns={columns['assets-trackings']!}
                currentPage={currentPage}
                data={assetsTrackings}
                onClickRow={handleRowClick}
                onSort={setSort}
                pageCount={pageCount}
                pageSize={pageSize}
                setCurrentPage={setCurrentPage}
                setPageSize={setPageSize}
                totalCount={totalCount}
              />
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>

        <ModelCreateModal<AssetsTracking>
          title="assets-trackings"
          endpoint="assets-trackings"
          schema={schemas['assets-trackings']!}
          fields={fields['assets-trackings']!}
          buttonProps={{
            variant: 'outline',
            leftIcon: <TbActivity />,
          }}
          onSuccess={assetsTrackingsQuery.refetch}
        >
          {t('add-tracking')}
        </ModelCreateModal>
      </Stack>
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default AssetPage
