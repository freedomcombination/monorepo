import { useDisclosure } from '@chakra-ui/react'
import { FaCogs } from 'react-icons/fa'

import {
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@fc/chakra'
import { useHashtag } from '@fc/services/hashtag'

import { ActionStack } from '../ActionStack'
import { usePostContext } from '../PostProvider'
import { PostSentenceForm } from '../PostSentenceForm'

export const PostSentencesModal = () => {
  const { open, onOpen, onToggle } = useDisclosure()
  const { post } = usePostContext()
  const hashtag = useHashtag()

  return (
    <ActionStack
      /*
        from PostMakerTweetList
      */
      canUpdate="posts"
    >
      <Modal open={open} onOpenChange={onToggle} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manage Post Sentences</ModalHeader>
          <ModalBody>
            <PostSentenceForm id={post?.id || 0} hashtagId={hashtag.id} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <IconButton
        aria-label="Manage sentences"
        icon={<FaCogs />}
        onClick={onOpen}
        variant={'outline'}
        isRound
      />
    </ActionStack>
  )
}
