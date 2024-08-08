import React, { FC, useState } from 'react'

import { Avatar, AvatarRootProps } from '@chakra-ui/react'

import { FileFormats, UploadFile } from '@fc/types'
import { getMediaUrl } from '@fc/utils'

type WAvatarProps = Omit<AvatarRootProps, 'src'> & {
  src?: UploadFile | null | string | null
}

export const WAvatar: FC<WAvatarProps> = ({ src, size, ...props }) => {
  const [fallbackUrl, setFallbackUrl] = useState<string>()

  const mediaSize = size ? ('thumbnail' as keyof FileFormats) : undefined

  return (
    <Avatar.Root
      src={fallbackUrl || getMediaUrl(src, false, mediaSize)}
      onError={() => {
        const fallback = getMediaUrl(src, true, mediaSize)
        setFallbackUrl(fallback)
      }}
      size={size}
      {...props}
    >
      <Avatar.Image />
      <Avatar.Fallback />
    </Avatar.Root>
  )
}
