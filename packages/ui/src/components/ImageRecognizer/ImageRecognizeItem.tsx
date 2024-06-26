import { FC } from 'react'

import { IconButton, Image, SimpleGrid } from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'

import { ImageRecognizeItemProps } from './types'
import { ContentEditable } from '..'

export const ImageRecognizeItem: FC<ImageRecognizeItemProps> = ({
  onUpdate,
  value,
  preview,
  onRemove,
}) => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      borderWidth={1}
      maxH={'full'}
      pos={'relative'}
    >
      <Image
        maxH={'inherit'}
        objectFit={'cover'}
        w={'full'}
        src={preview}
        alt={'recognized'}
      />
      <ContentEditable overflowY={'auto'} onUpdate={onUpdate} value={value} />
      <IconButton
        aria-label="Remove image"
        pos={'absolute'}
        isRound
        top={-4}
        right={-4}
        colorScheme={'red'}
        icon={<FaTimes />}
        onClick={onRemove}
      />
    </SimpleGrid>
  )
}
