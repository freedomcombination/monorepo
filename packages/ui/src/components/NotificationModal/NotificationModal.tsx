import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Stack,
} from '@chakra-ui/react'

type NotificationModalProps = {
  isOpen: boolean
  onClose: () => void
  subOnClick: React.MouseEventHandler<HTMLButtonElement>
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  subOnClick,
}) => {
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Never miss out on our events!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Text>
                Subscribe to notifications to stay informed about our latest
                events!
              </Text>
              <Text fontSize="sm" color="red">
                *If you are on a mobile device, please add this web page to your
                home screen in order to receive notifications.
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="green"
              onClick={e => {
                subOnClick(e)
                onClose()
              }}
            >
              Subscribe
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NotificationModal
