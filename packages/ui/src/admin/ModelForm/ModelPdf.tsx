import { useEffect, useState } from 'react'

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
  Stack,
} from '@chakra-ui/react'

export type ModelPdfProps = {
  title?: string
  isOpen: boolean
  onClose: () => void
  size?: string
  maxW?: string
  maxH?: string
  mediaUrl: string
}

export const ModelPdf = ({
  title,
  isOpen,
  onClose,
  size = '6xl',
  maxW,
  maxH,
  mediaUrl,
  ...rest
}: ModelPdfProps) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (isOpen) {
      const iframe = document.createElement('iframe')
      iframe.src = mediaUrl

      iframe.style.border = 'none'
      iframe.onload = () => {
        setIsLoading(false)
      }
      const modalBody = document.getElementById('modal-body')
      if (modalBody) {
        modalBody.innerHTML = ''
        modalBody.appendChild(iframe)
      }
    }
  }, [isOpen, mediaUrl])
  let fileTitle = ''
  if (title) {
    fileTitle = title?.charAt(0).toUpperCase() + title?.slice(1)
  }

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      closeOnEsc={false}
      {...rest}
    >
      <ModalOverlay />
      <ModalContent maxW={maxW} maxH={maxH} overflow={'auto'}>
        <ModalHeader color={'primary.500'}>
          <Heading as="h3">{fileTitle}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        {isLoading && (
          <Center>
            <Spinner />
          </Center>
        )}
        <ModalBody pos="relative" p={0}>
          <Stack id="modal-body"></Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
