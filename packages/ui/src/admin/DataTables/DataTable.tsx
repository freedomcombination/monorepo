import {
  Box,
  HStack,
  Image,
  Select,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { StrapiModel } from '@fc/types'

import { DataTableProps } from './types'
import { Pagination, WTable } from '../../components'
// import { ExportPDF } from '../ExportPDF'

export const DataTable = <T extends StrapiModel>({
  currentPage,
  setCurrentPage,
  pageCount,
  totalCount,
  children,
  pageSize,
  setPageSize,
  allowExportPDF = false,
  ...tableProps
}: DataTableProps<T>) => {
  const { t } = useTranslation()

  return (
    <Stack spacing={4} overflow={'hidden'}>
      <Box bg="white" shadow="base" overflow={'auto'}>
        {tableProps.data?.length > 0 ? (
          <WTable {...tableProps} />
        ) : (
          <VStack p={8} spacing={8}>
            <Image w={'25vw'} src={'/images/no-blog.svg'} alt={t('no-data')} />
            <Text>{t('no-data')}</Text>
          </VStack>
        )}
      </Box>
      {children}
      <Spacer />
      {(totalCount > 10 || allowExportPDF) && (
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify={{ base: 'center', md: 'space-between' }}
          align={'center'}
          py={4}
        >
          <HStack flex={1} justify={{ base: 'center', md: 'start' }}>
            {/* {allowExportPDF && (
              <ExportPDF data={tableProps.data} columns={tableProps.columns} />
            )} */}
            <Select
              w={20}
              textAlign={'center'}
              value={pageSize}
              onChange={e => setPageSize(+e.target.value)}
              _focusVisible={{
                shadow: 'none',
                borderColor: 'primary.500',
                borderWidth: 2,
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </Select>
            <Text noOfLines={1}>{t('items.on-page')}</Text>
          </HStack>
          <Pagination
            totalCount={pageCount}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
          <Text
            flex={1}
            textAlign={{ base: 'center', md: 'right' }}
            noOfLines={1}
          >
            {totalCount} {t('items.total')}
          </Text>
        </Stack>
      )}
    </Stack>
  )
}
