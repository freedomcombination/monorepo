import { FC } from 'react'

import { ImageProps } from '@chakra-ui/react'

import { PlatformSlug, Post, UploadFile } from '@fc/types'

import { usePostContext } from '../../post-maker/PostProvider'
import { Caps } from '../Caps'
import { WImage } from '../WImage'

type PostImageProps = Omit<ImageProps, 'id'> & {
  post?: Post
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export const PostImage: FC<PostImageProps> = ({
  post: defaultPost,
  size = 'lg',
  ...rest
}) => {
  const postState = usePostContext()

  const post = defaultPost || (postState?.post as Post)

  if (!post) return null

  if (post.caps) {
    return <WImage ratio={'twitter'} src={post.caps} />
  }

  const image = post?.image || ({} as UploadFile)
  const platform = (post?.hashtag?.platform?.slug ??
    'trend-rights') as PlatformSlug

  const scales = {
    xs: 300 / 1200,
    sm: 500 / 1200,
    md: 900 / 1200,
    lg: 1200 / 1200,
  }

  return (
    <Caps
      imageParams={{
        text: post.description as string,
        image,
        scale: scales[size],
        platform,
        ...post.imageParams,
      }}
      {...rest}
    />
  )
}
