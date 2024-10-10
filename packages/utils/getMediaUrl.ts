import { API_URL } from '@fc/config'
import { FileFormats, UploadFile } from '@fc/types'

const getFormattedMedia = (media: UploadFile, size?: keyof FileFormats) => {
  if (!size) {
    return media
  }

  return media.formats?.[size] || media
}

export const getMediaUrl = (
  src?: string | UploadFile | null,
  size?: keyof FileFormats,
) => {
  if (!src) {
    return ''
  }

  if (typeof src === 'string') {
    if ((src as string).startsWith('/uploads')) {
      return API_URL + src
    }

    return src
  }

  if (src.url?.startsWith('/uploads')) {
    return API_URL + getFormattedMedia(src, size)?.url
  }

  return getFormattedMedia(src, size)?.url
}
