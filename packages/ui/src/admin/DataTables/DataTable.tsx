import {
  Box,
  Spacer,
  Stack,
  Text,
  Image,
  VStack,
  HStack,
  Select,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { StrapiModel } from '@wsvvrijheid/types'

import { DataTableProps } from './types'
import { Pagination, WTable } from '../../components'

export const DataTable = <T extends StrapiModel>({
  currentPage,
  setCurrentPage,
  pageCount,
  totalCount,
  pageSize,
  setPageSize,
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
      <Spacer />
      {pageCount > 1 && (
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify={{ base: 'center', md: 'space-between' }}
          align={'center'}
        >
          <HStack flex={1} justify={{ base: 'center', md: 'start' }}>
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
