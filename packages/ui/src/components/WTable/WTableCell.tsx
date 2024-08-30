import { ReactNode } from 'react'

import { Badge, Box, Td } from '@chakra-ui/react'

import { StrapiModel, UploadFile } from '@fc/types'

import { TableCellImages } from './TableCellImages'
import { WTableCellProps } from './types'
import { FormattedDate } from '../FormattedDate'

export const WTableCell = <T extends StrapiModel>({
  value,
  cellConfig,
  field,
  model,
}: WTableCellProps<T>) => {
  const { type, transform, transformWithModel, componentProps, cellProps } =
    cellConfig
  const data = (
    typeof transformWithModel === 'function'
      ? transformWithModel(value as T[keyof T], model as T)
      : typeof transform === 'function'
        ? transform(value as T[keyof T])
        : value
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
    <Td {...cellProps}>
      <Box
        {...(field === 'description' && { noOfLines: 1, maxW: 120 })}
        noOfLines={1}
      >
        {cellContent || '-'}
      </Box>
    </Td>
  )
}
