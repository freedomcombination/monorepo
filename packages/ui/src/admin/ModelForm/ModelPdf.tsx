import { useEffect, useState } from 'react'

import {
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

export type ModelPdfProps = {
  title?: string
  isOpen: boolean
  onClose: () => void
  size?: string
  maxW?: string
  mediaUrl: string
}

export const ModelPdf = ({
  title,
  isOpen,
  onClose,
  size = '5xl',
  maxW,
  mediaUrl,

  ...rest
}: ModelPdfProps) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (isOpen) {
      const iframe = document.createElement('iframe')
      iframe.src = mediaUrl
      iframe.width = '100%'
      iframe.height = '100%'
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
      <ModalContent maxW={maxW} p={0} overflow={'auto'} h={'100%'}>
        <ModalHeader color={'primary.500'}>
          <Heading as="h3">{fileTitle}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            {title} is loading ...
          </div>
        )}
        <div id="modal-body" style={{ width: '100%', height: '100%' }}></div>
      </ModalContent>
    </Modal>
  )
}
