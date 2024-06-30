import { ReactNode } from 'react'

import { StrapiModel } from '@fc/types'

import { WTableProps } from '../WTable'

export type DataTableProps<T extends StrapiModel> = {
  pageCount: number
  totalCount: number
  currentPage: number
  pageSize: number
  setCurrentPage: (page: number) => void
  children?: ReactNode
  setPageSize: (pageSize: number) => void
  allowExportPDF?: boolean
} & Pick<WTableProps<T>, 'data' | 'columns' | 'onClickRow' | 'onSort'>
