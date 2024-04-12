import { theme } from '@chakra-ui/react'
import { sample } from 'lodash'

import { OgImageParams } from '@fc/types'

import { getMediaUrl } from './getMediaUrl'

export const generateOgImageParams = (props?: OgImageParams) => {
  const image = props?.image
    ? props.image
    : props?.randomImage
      ? 'https://picsum.photos/300/675'
      : undefined

  const bgs = Object.entries(theme.colors)
    .filter(([key]) => key !== 'black' && key !== 'white')
    .map(([, val]) => val[50])

  const colors = Object.entries(theme.colors)
    .filter(([key]) => key !== 'black' && key !== 'white')
    .map(([, val]) => val[500])

  const index = Math.floor(Math.random() * bgs.length)
  const bg = sample([bgs[index], 'white'])
  const color = colors[index]

  const shape = props?.shape ?? Math.floor(Math.random() * 4)

  const flip = props?.flip ?? Math.random() > 0.5
  const hasLine = props?.hasLine ?? Math.random() > 0.5

  const src = getMediaUrl(image)

  return {
    bg,
    color,
    image: src,
    shape,
    flip,
    hasLine,
    ...props,
  }
}
