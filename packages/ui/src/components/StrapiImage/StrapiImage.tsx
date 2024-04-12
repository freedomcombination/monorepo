import { FC } from 'react'

import Image, { ImageProps } from 'next/image'

import { UploadFile } from '@fc/types'
import { getMediaUrl } from '@fc/utils'

type StrapiImageProps = Omit<ImageProps, 'src'> & {
  src: UploadFile | string
}

const mapStrapiImage = (width: number, image: UploadFile) => {
  const images = []

  if (image.formats) {
    const formats = Object.values(image.formats)
      .filter(f => !!f)
      .map(({ url, width }) => ({ url: getMediaUrl(url), width }))
      .sort((a, b) => a.width - b.width)

    images.unshift(...formats)
  }

  // Find the image that is closest in images array
  const imageToUse = images.reduce((prev, curr) => {
    return Math.abs(curr.width - width) < Math.abs(prev.width - width)
      ? curr
      : prev
  }, images[0])

  return getMediaUrl(imageToUse?.url) || getMediaUrl(image)
}

export const StrapiImage: FC<StrapiImageProps> = ({
  src,
  alt,
  sizes,
  ...rest
}) => {
  const url = getMediaUrl(src)

  const isFile = typeof src !== 'string'

  const isSvg = isFile ? src?.mime?.includes('svg') : src.includes('.svg')

  return (
    <Image
      src={url}
      alt={alt || (src as UploadFile).name}
      fill
      {...(isFile &&
        !isSvg && {
          loader: ({ width }) => mapStrapiImage(width, src as UploadFile),
        })}
      sizes={sizes || '100vw'}
      unoptimized
      {...rest}
    />
  )
}
