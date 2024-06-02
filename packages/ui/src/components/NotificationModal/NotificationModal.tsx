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
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('never-miss-events')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Text>{t('sub-to-notifications')}</Text>
              <Text fontSize="sm" color="red">
                {t('sub-notifications-mobile-warning')}
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              {t('close')}
            </Button>
            <Button
              colorScheme="green"
              onClick={e => {
                subOnClick(e)
                onClose()
              }}
            >
              {t('subscribe')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NotificationModal
