// there are lint errors here and i could't fix them

import {
  Box,
  Button,
  HStack,
  Image,
  Select,
  Spacer,
  Stack,
  Text,
  VStack,
  useTheme,
} from '@chakra-ui/react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FaFilePdf } from 'react-icons/fa6'

import { StrapiModel } from '@fc/types'

import { I18nNamespaces } from '../../../@types/i18next'
import {
  Pagination,
  WTable,
  getColumnsForPDF,
  getRowsForPDF,
} from '../../components'
import { DataTableProps } from './types'

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
  const theme = useTheme()
  const { locale } = useRouter()

  const exportPDF = () => {
    const columns = getColumnsForPDF(tableProps.columns, (a, b) =>
      t(a as keyof I18nNamespaces['common']),
    )
    const rows = getRowsForPDF(
      tableProps.data,
      tableProps.columns,
      locale,
      (a, b) => t(a as keyof I18nNamespaces['common']),
    )

    const doc = new jsPDF({
      orientation: 'landscape',
    })
    doc.addFont(
      theme.fonts.body,
      'PDFFont',
      'normal',
      'normal',
      'WinAnsiEncoding',
    )

    autoTable(doc, {
      head: [columns],
      body: rows,
    })

    doc.save('table.pdf')
  }

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
            <Button
              leftIcon={<FaFilePdf />}
              colorScheme="primary"
              variant="outline"
              onClick={exportPDF}
            >
              Export PDF
            </Button>
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
