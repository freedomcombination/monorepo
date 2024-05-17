import { useState } from 'react'

import {
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  chakra,
} from '@chakra-ui/react'

export type ModelPdfProps = {
  title?: string
  isOpen: boolean
  onClose: () => void
  mediaUrl: string
}

export const ModelPdf = ({
  title,
  isOpen,
  onClose,
  mediaUrl,
}: ModelPdfProps) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size={'3xl'}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent h={'90vh'} p={0}>
        <ModalHeader color={'primary.500'}>
          <Heading as="h3" textTransform={'capitalize'}>
            {title}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0} h="100%">
          {isLoading ? (
            <Center boxSize={'full'}>
              <Spinner />
            </Center>
          ) : (
            <chakra.iframe
              onLoadedData={() => setIsLoading(false)}
              src={mediaUrl}
              boxSize={'full'}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
