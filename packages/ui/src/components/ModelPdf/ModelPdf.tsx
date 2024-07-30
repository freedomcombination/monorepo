import { useState } from 'react'

import { Center, Heading, Spinner, chakra } from '@chakra-ui/react'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@fc/ui'

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
        <ModalBody pos={'relative'} p={0} h="100%">
          <chakra.iframe
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            src={mediaUrl}
            boxSize={'full'}
          />
          {isLoading && (
            <Center
              bg={'whiteAlpha.900'}
              pos={'absolute'}
              top={0}
              left={0}
              boxSize={'full'}
            >
              <Spinner />
            </Center>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
