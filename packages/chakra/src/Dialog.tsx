import { forwardRef } from 'react'

import { Dialog as ChakraDialog, Heading, Portal } from '@chakra-ui/react'

import { CloseButton } from './CloseButton'

interface DialogContentProps extends ChakraDialog.ContentProps {
  portalled?: boolean
  containerRef?: React.RefObject<HTMLElement>
  // showArrow?: boolean
  showBackdrop?: boolean
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent(props, ref) {
    const {
      children,
      portalled = true,
      containerRef,
      // showArrow,
      showBackdrop = true,
      ...rest
    } = props

    return (
      <Portal disabled={!portalled} container={containerRef}>
        {showBackdrop && <ChakraDialog.Backdrop />}
        <ChakraDialog.Positioner>
          <ChakraDialog.Content ref={ref} {...rest} asChild={false}>
            {children}
          </ChakraDialog.Content>
        </ChakraDialog.Positioner>
      </Portal>
    )
  },
)

export const DialogTrigger = (props: ChakraDialog.TriggerProps) => {
  return <ChakraDialog.Trigger {...props} />
}

export const DialogCloseTrigger = (props: ChakraDialog.CloseTriggerProps) => {
  return (
    <ChakraDialog.CloseTrigger {...props} asChild>
      <CloseButton size="sm">{props.children}</CloseButton>
    </ChakraDialog.CloseTrigger>
  )
}

export const DialogTitle = (props: ChakraDialog.TitleProps) => {
  return (
    <ChakraDialog.Title {...props} asChild>
      <Heading as="h2" size="lg" lineHeight="1.2">
        {props.children}
      </Heading>
    </ChakraDialog.Title>
  )
}

export const DialogDescription = (props: ChakraDialog.DescriptionProps) => {
  return <ChakraDialog.Description color="fg.muted" {...props} />
}

export const DialogRoot = ChakraDialog.Root
export const DialogFooter = ChakraDialog.Footer
export const DialogHeader = ChakraDialog.Header
export const DialogBody = ChakraDialog.Body
export const DialogBackdrop = ChakraDialog.Backdrop

export const Modal = DialogRoot
export const ModalBody = DialogBody
export const ModalFooter = DialogFooter
export const ModalOverlay = DialogBackdrop
export const ModalHeader = DialogHeader
export const ModalContent = DialogContent
export const ModalCloseButton = DialogCloseTrigger
