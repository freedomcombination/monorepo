/* eslint-disable no-unused-vars */
import { ReactNode } from 'react'

import {
  AvatarProps,
  BadgeProps,
  TableCellProps,
  TableProps,
  TextProps,
} from '@chakra-ui/react'

import { Sort, StrapiModel, UploadFile } from '@fc/types'

import { FormattedDateProps } from '../FormattedDate'

type CustomCellType = 'text' | 'badge' | 'image' | 'date'

type CustomCell<Type extends CustomCellType, T, P> = {
  type?: Type
  componentProps?: P | ((value: T[keyof T]) => P)
}

type CellConfigCommon<T extends StrapiModel> =
  | CustomCell<'text', T, TextProps>
  | CustomCell<'badge', T, BadgeProps>
  | CustomCell<'image', T, AvatarProps>
  | CustomCell<'date', T, Partial<FormattedDateProps>>

export type CellConfig<T extends StrapiModel> = CellConfigCommon<T> & {
  accessorKey: keyof T
  cellProps?: TableCellProps
  label?: string
  sortable?: boolean // Currently not supported when transform is used
  transform?: (value: T[keyof T], model?: T) => ReactNode
  transformPDF?: (value: T[keyof T]) => string
  sortKey?: string
}

export type WTableCellProps<T extends StrapiModel> = {
  // TODO Add specific type for each cell value
  column: CellConfig<T>
  model: T
}

export type TableHeaderCellProps<T extends StrapiModel> = {
  column: CellConfig<T>
  index: number
  selectedIndex: number | null
  sortMode: 'asc' | 'desc' | null
  setSelectedIndex: (index: number) => void
  setSortMode: (mode: 'asc' | 'desc' | null) => void
}

export type WTableRowProps<T extends StrapiModel> = {
  columns: Array<CellConfig<T>>
  model: T
  modelIndex: number
  onClick?: (index: number, id: number) => void
}

export type WTableProps<T extends StrapiModel> = {
  data: T[]
  columns: WTableRowProps<T>['columns']
  onClickRow?: WTableRowProps<T>['onClick']
  onSort?: (key?: Sort) => void
} & TableProps

export type TableCellImagesProps = {
  value: UploadFile | UploadFile[]
}

export type TableCellImageProps = {
  image: UploadFile
}
