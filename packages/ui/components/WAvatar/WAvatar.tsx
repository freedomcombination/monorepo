import React, { FC, useState } from 'react'

import { Avatar, AvatarProps } from '@fc/chakra'
import type { FileFormats, UploadFile } from '@fc/types'
import { getMediaUrl } from '@fc/utils/getMediaUrl'

type WAvatarProps = Omit<AvatarProps, 'src'> & {
  src?: UploadFile | null | string | null
}

export const WAvatar: FC<WAvatarProps> = ({ src, size, ...props }) => {
  const [fallbackUrl, setFallbackUrl] = useState<string>()

  const mediaSize = size ? ('thumbnail' as keyof FileFormats) : undefined

  return (
    <Avatar
      src={fallbackUrl || getMediaUrl(src, false, mediaSize)}
      onError={() => {
        const fallback = getMediaUrl(src, true, mediaSize)
        setFallbackUrl(fallback)
      }}
      size={size}
      {...props}
    />
  )
}
