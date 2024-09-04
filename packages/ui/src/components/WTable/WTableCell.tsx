import { ReactNode } from 'react'

import { Badge, Box, Td } from '@chakra-ui/react'

import { StrapiModel, UploadFile } from '@fc/types'

import { TableCellImages } from './TableCellImages'
import { WTableCellProps } from './types'
import { FormattedDate } from '../FormattedDate'

export const WTableCell = <T extends StrapiModel>({
  column,
  model,
}: WTableCellProps<T>) => {
  const { accessorKey, type, transform, componentProps, cellProps } = column

  const value = model[accessorKey]

  const data = (
    typeof transform === 'function'
      ? transform(value as T[keyof T], model)
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
        {...(accessorKey === 'description' && { noOfLines: 1, maxW: 120 })}
        noOfLines={1}
      >
        {cellContent || '-'}
      </Box>
    </Td>
  )
}
