import { OgImageParams } from '@fc/types'

import { generateOgImageParams } from './generateOgImageProps'

export const getOgImageSrc = (props: OgImageParams) => {
  const ogImageProps = generateOgImageParams(props)

  const params = new URLSearchParams(
    JSON.parse(JSON.stringify(ogImageProps)),
  ).toString()

  return `/api/og?${params}`
}
