import {
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { FaCogs } from 'react-icons/fa'

import { useHashtag } from '@fc/services'

import { ActionStack, PostSentenceForm } from '../../components'
import { usePostContext } from '../PostProvider'

export const PostSentencesModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { post } = usePostContext()
  const hashtag = useHashtag()

  return (
    <ActionStack
      /*
        from PostMakerTweetList
      */
      canUpdate="posts"
    >
      <Modal isOpen={isOpen} onClose={onClose} size={'6xl'}>
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
