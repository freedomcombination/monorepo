import { FC } from 'react'

import {
  AvatarGroup,
  Box,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'

import type { UploadFile } from '@fc/types'
import { getMediaUrl } from '@fc/utils/getMediaUrl'

import { TableCellImageProps, TableCellImagesProps } from './types'
import { WAvatar } from '../WAvatar'
import { WImage } from '../WImage'

const TableCellImage: FC<TableCellImageProps> = ({ image }) => {
  const thumbnail = (image?.formats?.thumbnail?.url ||
    image?.formats?.xsmall ||
    image?.formats?.small ||
    image?.formats?.medium ||
    image?.formats?.large ||
    image?.formats?.xlarge ||
    image?.url) as unknown as UploadFile

  return (
    <Popover trigger="hover" isLazy placement="right">
      <PopoverTrigger>
        <Box>
          <WAvatar
            mr={-2}
            ring={2}
            ringColor={'white'}
            boxSize={8}
            src={getMediaUrl(thumbnail)}
          />
        </Box>
      </PopoverTrigger>
      <PopoverContent ml={8} p={0} w={'auto'} overflow={'hidden'}>
        <WImage w={'50vw'} src={image} sizes={'400px'} />
      </PopoverContent>
    </Popover>
  )
}

export const TableCellImages: FC<TableCellImagesProps> = ({ value }) => {
  const images: UploadFile[] = []

  if (Array.isArray(value)) {
    images.push(...value)
  } else if (value) {
    images.push(value)
  }

  return (
    <AvatarGroup>
      {images
        ?.slice(0, 5)
        .map((image, index) => <TableCellImage key={index} image={image} />)}
    </AvatarGroup>
  )
}
