import { FC, useState } from 'react'

import Image, { ImageProps } from 'next/image'

import type { UploadFile } from '@fc/types'
import { getMediaUrl } from '@fc/utils/getMediaUrl'

type StrapiImageProps = Omit<ImageProps, 'src'> & {
  src: UploadFile | string
}

const mapStrapiImage = (
  width: number,
  image: UploadFile,
  fallback: boolean,
) => {
  const images = []

  if (image.formats) {
    const formats = Object.values(image.formats)
      .filter(f => !!f)
      .map(({ url, width }) => ({ url: getMediaUrl(url, fallback), width }))
      .sort((a, b) => a.width - b.width)

    images.unshift(...formats)
  }

  // Find the image that is closest in images array
  const imageToUse = images.reduce((prev, curr) => {
    return Math.abs(curr.width - width) < Math.abs(prev.width - width)
      ? curr
      : prev
  }, images[0])

  return getMediaUrl(imageToUse?.url, fallback) || getMediaUrl(image, fallback)
}

export const StrapiImage: FC<StrapiImageProps> = ({
  src,
  alt,
  sizes,
  ...rest
}) => {
  const [fallback, setFallback] = useState<boolean>(false)

  const url = fallback
    ? getMediaUrl(src, true) || getMediaUrl(src)
    : getMediaUrl(src)

  const isFile = typeof src !== 'string'

  const isSvg = isFile ? src?.mime?.includes('svg') : src.includes('.svg')

  return (
    <Image
      src={url}
      alt={alt || (src as UploadFile).name}
      fill
      // We use fallback only in development and staging
      // Because when we import the database from production
      // The images are not available in the staging environment or locally
      {...(isFile &&
        !isSvg && {
          loader: ({ width }) =>
            mapStrapiImage(width, src as UploadFile, fallback),
        })}
      sizes={sizes || '100vw'}
      unoptimized
      onError={() => {
        setFallback(true)
      }}
      {...rest}
    />
  )
}
