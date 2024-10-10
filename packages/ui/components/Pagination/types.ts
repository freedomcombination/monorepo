import { ButtonGroupProps } from '@chakra-ui/react'

export type PaginationProps = {
  totalCount: number
  siblingCount?: number
  currentPage: number
  onPageChange: (page: number) => void
} & ButtonGroupProps

export type UsePaginationProps = Pick<
  PaginationProps,
  'totalCount' | 'siblingCount' | 'currentPage'
>
