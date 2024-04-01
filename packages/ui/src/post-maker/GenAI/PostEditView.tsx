import { Heading, Stack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Hashtag, Post } from '@fc/types'

import { TabbedGenAIView } from './TabbedGenView'
import { PostSentenceForm } from '../../components'

type PostEditViewProps = {
  hashtag: Hashtag
  post: Post
}

export const PostEditView: React.FC<PostEditViewProps> = ({
  hashtag,
  post,
}) => {
  return (
    <Stack rounded="md" bg="white" shadow="md">
      <TabbedGenAIView hashtag={hashtag} post={post} noBorder />
      <Stack p={{ base: 4, lg: 8 }}>
        <Heading>{t('sentences')}</Heading>
        <PostSentenceForm id={post.id} hashtagId={hashtag.id} />
      </Stack>
    </Stack>
  )
}
