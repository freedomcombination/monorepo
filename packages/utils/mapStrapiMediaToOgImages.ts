import type { UploadFile } from '@fc/types'

import { getMediaUrl } from './getMediaUrl'

export const mapStrapiMediaToOgImages = (
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
