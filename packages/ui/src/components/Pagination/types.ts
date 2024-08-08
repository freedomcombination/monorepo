import { StackProps } from '@chakra-ui/react'

export type PaginationProps = {
  totalCount: number
  siblingCount?: number
  currentPage: number
  onPageChange: (page: number) => void
} & StackProps

export type UsePaginationProps = Pick<
  PaginationProps,
  'totalCount' | 'siblingCount' | 'currentPage'
>
