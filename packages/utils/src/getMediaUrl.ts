import { ASSETS_FALLBACK_URL, ASSETS_URL } from '@fc/config'
import { FileFormats, UploadFile } from '@fc/types'

const getFormattedMedia = (media: UploadFile, size?: keyof FileFormats) => {
  if (!size) {
    return media
  }

  return media.formats?.[size] || media
}

export const getMediaUrl = (
  src?: string | UploadFile | null,
  fallback?: boolean,
  size?: keyof FileFormats,
) => {
  if (!src) {
    return ''
  }

  const prefix = fallback ? ASSETS_FALLBACK_URL : ASSETS_URL

  if (typeof src === 'string') {
    if ((src as string).startsWith('/uploads')) {
      return prefix + src
    }

    if (fallback) {
      return src?.replace(ASSETS_URL, ASSETS_FALLBACK_URL)
    }

    return src
  }

  if (src.url?.startsWith('/uploads')) {
    return prefix + getFormattedMedia(src, size)?.url
  }

  if (fallback) {
    return src.url?.replace(ASSETS_URL, ASSETS_FALLBACK_URL)
  }

  return src.url
}
