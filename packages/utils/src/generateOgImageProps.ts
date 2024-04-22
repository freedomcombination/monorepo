import { theme } from '@chakra-ui/react'
import { sample } from 'lodash'

import { ASSETS_URL } from '@fc/config'
import { OgImageParams } from '@fc/types'

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

  const url = typeof image === 'string' ? image : image?.url
  const src = url?.startsWith('/uploads') ? ASSETS_URL + image : image

  const platform = props?.platform ?? "trend-rights"

  return {
    bg,
    color,
    image: src,
    shape,
    flip,
    hasLine,
    platform,
    ...props,
  }
}
