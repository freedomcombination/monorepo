import { FC } from 'react'

import { Heading } from '@chakra-ui/react'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@fc/chakra'

type ModelModalProps = {
  title?: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const ModelModal: FC<ModelModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Modal
      centered
      open={isOpen}
      onOpenChange={() => onClose()}
      size={'lg'}
      scrollBehavior="inside"
      closeOnInteractOutside={false}
      closeOnEscape={false}
    >
      <ModalOverlay />
      <ModalContent h={'90vh'} p={0}>
        <ModalHeader color={'primary.500'}>
          <Heading as="h3" textTransform={'capitalize'}>
            {title}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pos={'relative'} p={0} h="100%">
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
