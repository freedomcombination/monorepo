import { FC, useRef } from 'react'

import { ArtCardAlertDialogProps } from './types'
import { Button } from '../Button'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '../Modal'

export const ArtCardAlertDialog: FC<ArtCardAlertDialogProps> = ({
  buttonText,
  colorPalette,
  isOpen,
  text,
  title,
  onClick,
  onClose,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null)

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="lg" fontWeight={600}>
          {title}
        </ModalHeader>

        <ModalBody>{text}</ModalBody>

        <ModalFooter>
          <Button onClick={onClose} ref={cancelRef}>
            Cancel
          </Button>
          <Button colorPalette={colorPalette} onClick={onClick} ml={3}>
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
