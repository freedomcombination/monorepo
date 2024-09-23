import { ReactNode } from 'react'

import { BadgeProps } from '@chakra-ui/react'

import type { StrapiModel } from '@fc/types'

import { WTableProps } from '../WTable'

export type DataTableBadgeProps<T extends StrapiModel> = {
  badgeProp?: BadgeProps
  badgeText: (data: T[]) => string
}

export type DataTableProps<T extends StrapiModel> = {
  pageCount: number
  totalCount: number
  currentPage: number
  pageSize: number
  setCurrentPage: (page: number) => void
  children?: ReactNode
  setPageSize: (pageSize: number) => void
  allowExportPDF?: boolean
  badges?: DataTableBadgeProps<T>[]
} & Pick<WTableProps<T>, 'data' | 'columns' | 'onClickRow' | 'onSort'>
