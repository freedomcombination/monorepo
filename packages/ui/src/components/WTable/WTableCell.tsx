import { ReactNode } from 'react'

import { Badge, Box, TableCell } from '@chakra-ui/react'

import { StrapiModel, UploadFile } from '@fc/types'

import { TableCellImages } from './TableCellImages'
import { WTableCellProps } from './types'
import { FormattedDate } from '../FormattedDate'

export const WTableCell = <T extends StrapiModel>({
  value,
  cellConfig,
  field,
}: WTableCellProps<T>) => {
  const { type, transform, componentProps, cellProps } = cellConfig
  const data = (
    typeof transform === 'function' ? transform(value as T[keyof T]) : value
  ) as string | number | boolean

  let cellContent: ReactNode

  const props =
    typeof componentProps === 'function'
      ? componentProps(data as T[keyof T])
      : componentProps || {}

  // Badge
  if (type === 'badge') {
    cellContent = data ? <Badge {...props}>{data}</Badge> : '-'
  }

  // Date
  else if (type === 'date') {
    cellContent = data ? (
      <FormattedDate format={'dd MMM yy'} {...props} date={data as string} />
    ) : (
      '-'
    )
  }

  // Image
  else if (type === 'image') {
    cellContent = <TableCellImages value={value as UploadFile | UploadFile[]} />
  } else {
    cellContent = data
  }

  return (
    <TableCell {...cellProps}>
      <Box
        {...(field === 'description' && { lineClamp: 1, maxW: 120 })}
        lineClamp={1}
      >
        {cellContent || '-'}
      </Box>
    </TableCell>
  )
}
