import { ReactNode, useState } from 'react'

import {
  Badge,
  Box,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Td,
} from '@chakra-ui/react'

import { StrapiModel, UploadFile } from '@fc/types'
import { getMediaUrl } from '@fc/utils'

import { WTableCellProps } from './types'
import { FormattedDate } from '../FormattedDate'
import { WAvatar } from '../WAvatar'
import { WImage } from '../WImage'

export const WTableCell = <T extends StrapiModel>({
  value,
  cellConfig,
  field,
}: WTableCellProps<T>) => {
  const [cellImage, setCellImage] = useState<string>()

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
    const image = (value as UploadFile[])?.[0] || (value as UploadFile)
    const thumbnail = image?.formats?.thumbnail?.url || image?.url

    cellContent = (
      <Popover trigger="hover" isLazy placement="right">
        <PopoverTrigger>
          <Box>
            <WAvatar
              boxSize={8}
              src={cellImage || getMediaUrl(thumbnail)}
              onError={() => setCellImage(getMediaUrl(thumbnail))}
            />
          </Box>
        </PopoverTrigger>
        <PopoverContent p={0} w={'auto'} overflow={'hidden'}>
          <WImage w={'50vw'} src={image} sizes={'400px'} />
        </PopoverContent>
      </Popover>
    )
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
