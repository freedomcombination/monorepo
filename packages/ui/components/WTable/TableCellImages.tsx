import { FC, useState } from 'react'

import { Group, Box } from '@chakra-ui/react'

import { Popover, PopoverContent, PopoverTrigger } from '@fc/chakra'
import type { UploadFile } from '@fc/types'
import { getMediaUrl } from '@fc/utils/getMediaUrl'

import { TableCellImageProps, TableCellImagesProps } from './types'
import { WAvatar } from '../WAvatar'
import { WImage } from '../WImage'

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
    <Popover lazyMount positioning={{ placement: 'right-end' }}>
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
    <Group attached>
      {images
        ?.slice(0, 5)
        .map((image, index) => <TableCellImage key={index} image={image} />)}
    </Group>
  )
}
