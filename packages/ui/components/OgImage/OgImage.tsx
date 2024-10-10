import { FC, memo } from 'react'

import Image from 'next/image'

import type { OgImageParams } from '@fc/types'
import { getOgImageSrc } from '@fc/utils/getOgImageSrc'

type OgImageProps = {
  imageParams: OgImageParams
}

const OgImage: FC<OgImageProps> = ({ imageParams }) => {
  const src = getOgImageSrc(imageParams)

  return (
    <Image
      unoptimized
      width={1200}
      height={675}
      src={src}
      style={{ objectFit: 'cover', width: '100%' }}
      alt={imageParams.title || ''}
    />
  )
}

export default memo(OgImage)
