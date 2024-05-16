import { useEffect } from 'react'

import {
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import pdfjs from 'pdfjs-dist'
import { FieldValues, Path } from 'react-hook-form'

export type ModelPdfProps<T extends FieldValues = FieldValues> = {
  title?: Path<T>
  isOpen: boolean
  onClose: () => void
  size?: string
  maxW?: string
  mediaUrl: string
  children?: React.ReactNode
}

export const ModelPdf = ({
  title,
  isOpen,
  onClose,
  size = '5xl',
  maxW,
  mediaUrl,
  children = null,
  ...rest
}: ModelPdfProps) => {
  useEffect(() => {
    const loadAndRenderPdf = async () => {
      const loadingTask = pdfjs.getDocument(mediaUrl)

      try {
        const pdf = await loadingTask.promise
        const numPages = pdf.numPages

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdf.getPage(pageNum)
          const viewport = page.getViewport({ scale: 1.5 })

          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')

          if (context) {
            canvas.width = viewport.width
            canvas.height = viewport.height

            await page.render({
              canvasContext: context,
              viewport,
            }).promise

            document.body.appendChild(canvas)
          }
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    if (isOpen) {
      loadAndRenderPdf()
    }
  }, [isOpen, mediaUrl])

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
      <ModalContent maxW={maxW} p={0} overflow={'auto'}>
        <ModalHeader color={'primary.500'}>
          <Heading as="h3">{title}</Heading>
        </ModalHeader>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  )
}
