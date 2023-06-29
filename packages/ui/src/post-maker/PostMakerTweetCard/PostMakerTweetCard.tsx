import { FC } from 'react'

import { Stack } from '@chakra-ui/react'

import { PostMakerTweetButtons } from './PostMakerTweetButtons'
import { PostMakerTweetContent } from './PostMakerTweetContent'
import { PostMakerTweetTags } from './PostMakerTweetTags'
import { PostImage } from '../../components'

type PostMakerTweetCardProps = {
  isAdminMode?: boolean
  isIosSafari?: boolean
}

export const PostMakerTweetCard: FC<PostMakerTweetCardProps> = ({
  isAdminMode,
  isIosSafari,
}) => {
  return (
    <Stack
      p={4}
      bg={'white'}
      spacing={4}
      _hover={{
        bg: 'whiteAlpha.700',
      }}
    >
      <PostMakerTweetContent />
      <PostMakerTweetTags />
      <PostImage rounded="lg" borderWidth={1} overflow={'hidden'} />
      <PostMakerTweetButtons
        isAdminMode={isAdminMode}
        isIosSafari={isIosSafari}
      />
    </Stack>
  )
}
