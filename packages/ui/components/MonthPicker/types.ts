import { ReactNode } from 'react'

import { SimpleGridProps } from '@chakra-ui/react'

export type RangeParams = {
  startMonth: number
  startYear: number
  endMonth: number
  endYear: number
}

export type PickParams = {
  month: number
  year: number
}

export type MonthProps = {
  startMonth: Date | null
  endMonth: Date | null
  yearOffset: number
  monthIndex: number
  disableFuture: boolean
  handleMonthClick: (date: Date) => void
}

export type YearProps = Omit<MonthProps, 'monthIndex'> & {
  columns: SimpleGridProps['columns']
}

export type MonthPickerProps = {
  onRangeSelect?: (params: RangeParams) => void
  onSelect?: (params: PickParams) => void
  onClear?: () => void
  columns?: SimpleGridProps['columns']
  disableFuture?: boolean
  children?: ReactNode
}
