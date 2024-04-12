import React, { FC, useState } from 'react'

import { Avatar, AvatarProps } from '@chakra-ui/react'

import { FileFormats, UploadFile } from '@fc/types'
import { getMediaUrl } from '@fc/utils'

type WAvatarProps = Omit<AvatarProps, 'src'> & {
  src?: UploadFile | null | string | null
}

export const WAvatar: FC<WAvatarProps> = ({ src, size, ...props }) => {
  const mediaSize = size ? ('thumbnail' as keyof FileFormats) : undefined

  return <Avatar src={getMediaUrl(src, mediaSize)} {...props} />
}
