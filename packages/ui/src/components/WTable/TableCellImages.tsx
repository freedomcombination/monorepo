import { FC, useState } from 'react'

import { AvatarGroup, Box } from '@chakra-ui/react'

import { UploadFile } from '@fc/types'
import { getMediaUrl } from '@fc/utils'

import { TableCellImageProps, TableCellImagesProps } from './types'
import { WAvatar } from '../WAvatar'
import { WImage } from '../WImage'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'

const TableCellImage: FC<TableCellImageProps> = ({ image }) => {
  const [cellImage, setCellImage] = useState<string>()

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
            src={cellImage || getMediaUrl(thumbnail)}
            onError={() => setCellImage(getMediaUrl(thumbnail, true))}
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
