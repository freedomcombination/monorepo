/* eslint-disable no-unused-vars */
import { ComponentType, ReactNode } from 'react'

import {
  BadgeProps,
  TableCellProps,
  TableRootProps,
  TextProps,
} from '@chakra-ui/react'

import { Sort, StrapiModel, UploadFile } from '@fc/types'

import { FormattedDateProps } from '../FormattedDate'
import { WAvatar } from '../WAvatar'

type CustomCellType = 'text' | 'badge' | 'image' | 'date'

type CustomCell<Type extends CustomCellType, T, P> = {
  type?: Type
  componentProps?: P | ((value: T[keyof T]) => P)
}

type CellConfigCommon<T extends StrapiModel> =
  | CustomCell<'text', T, TextProps>
  | CustomCell<'badge', T, BadgeProps>
  | CustomCell<'image', T, ComponentType<typeof WAvatar>>
  | CustomCell<'date', T, Partial<FormattedDateProps>>

export type CellConfig<T extends StrapiModel> = CellConfigCommon<T> & {
  cellProps?: TableCellProps
  label?: string
  sortable?: boolean // Currently not supported when transform is used
  transform?: (value: T[keyof T]) => ReactNode
  transformPDF?: (value: T[keyof T]) => string
  sortKey?: string
}

export type WTableCellProps<T extends StrapiModel> = {
  value: T[keyof T]
  // TODO Add specific type for each cell value
  cellConfig: CellConfig<T>
  field: keyof T
}

export type WTableRowProps<T extends StrapiModel> = {
  columns: { [key in keyof T]?: CellConfig<T> }
  model: T
  modelIndex: number
  onClick?: (index: number, id: number) => void
}

export type WTableProps<T extends StrapiModel> = {
  data: T[]
  columns: WTableRowProps<T>['columns']
  onClickRow?: WTableRowProps<T>['onClick']
  onSort?: (key?: Sort) => void
} & TableRootProps

export type TableCellImagesProps = {
  value: UploadFile | UploadFile[]
}

export type TableCellImageProps = {
  image: UploadFile
}
