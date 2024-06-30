import { ImageProps as ChakraImageProps } from '@chakra-ui/react'

import { UploadFile } from '@fc/types'

export type WImageProps = {
  ratio?: number | 'twitter'
  src?: UploadFile | null | string
  alt?: string
  hasZoom?: boolean
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  unoptimized?: boolean
} & Omit<ChakraImageProps, 'objectFit' | 'src' | 'fill'>
