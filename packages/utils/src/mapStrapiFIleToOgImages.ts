import { UploadFile } from '@fc/types'

import { getMediaUrl } from './getMediaUrl'

export const mapStrapiFileToOgImages = (
  media?: UploadFile | null,
  alt?: string,
) =>
  media
    ? [
        {
          url: getMediaUrl(media),
          secureUrl: getMediaUrl(media),
          type: media.mime,
          width: media.width,
          height: media.height,
          alt,
        },
      ]
    : []
