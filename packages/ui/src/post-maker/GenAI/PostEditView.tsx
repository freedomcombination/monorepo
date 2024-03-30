import { Heading, Stack } from '@chakra-ui/react'
import { t } from 'i18next'

import { TabbedGenAIView } from './TabbedGenView'
import { PostSentenceForm } from '../../components'

type PostEditViewProps = {
  hashtagId: number
  postId: number
}

export const PostEditView: React.FC<PostEditViewProps> = ({
  hashtagId,
  postId,
}) => {
  return (
    <Stack rounded="md" bg="white" shadow="md">
      <TabbedGenAIView hashtagId={hashtagId} postId={postId} />
      <Stack p={{ base: 4, lg: 8 }}>
        <Heading>{t('sentences')}</Heading>
        <PostSentenceForm id={postId} hashtagId={hashtagId} />
      </Stack>
    </Stack>
  )
}
