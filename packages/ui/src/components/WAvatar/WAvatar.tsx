import React, { FC, useState } from 'react'

import { Avatar, AvatarProps } from '@chakra-ui/react'

import { FileFormats, UploadFile } from '@wsvvrijheid/types'
import { getMediaUrl } from '@wsvvrijheid/utils'

type WAvatarProps = Omit<AvatarProps, 'src'> & {
  src?: UploadFile | string | null
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
      {...props}
    />
  )
}
