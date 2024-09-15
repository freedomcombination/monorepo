import { StrapiModel } from '@fc/types'
import { WTableProps } from '../WTable'

export type ExportPDFProps<T extends StrapiModel> = Pick<
  WTableProps<T>,
  'data' | 'columns'
>
