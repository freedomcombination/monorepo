import { useDisclosure } from '@chakra-ui/hooks'
import { FaCogs } from 'react-icons/fa'

import { useHashtag } from '@fc/services'

import { ActionStack, PostSentenceForm } from '../../components'
import { IconButton } from '../IconButton'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '../Modal'
import { usePostContext } from '../PostProvider'

export const PostSentencesModal = () => {
  const { open, onOpen, onClose } = useDisclosure()
  const { post } = usePostContext()
  const hashtag = useHashtag()

  return (
    <ActionStack
      /*
        from PostMakerTweetList
      */
      canUpdate="posts"
    >
      <Modal isOpen={open} onClose={onClose} size={'xl'}>
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
        rounded={'full'}
      />
    </ActionStack>
  )
}
