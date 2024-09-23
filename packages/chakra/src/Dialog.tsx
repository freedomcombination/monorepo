import { forwardRef } from 'react'

import { Dialog as ChakraDialog, Heading, Portal } from '@chakra-ui/react'

import { CloseButton } from './CloseButton'

interface DialogContentProps extends ChakraDialog.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
  backdrop?: boolean
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent(props, ref) {
    const {
      children,
      portalled = true,
      portalRef,
      backdrop = true,
      ...rest
    } = props

    return (
      <Portal disabled={!portalled} container={portalRef}>
        {backdrop && <ChakraDialog.Backdrop />}
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

export const DialogCloseTrigger = forwardRef<
  HTMLButtonElement,
  ChakraDialog.CloseTriggerProps
>(function DialogCloseTrigger(props, ref) {
  return (
    <ChakraDialog.CloseTrigger
      position="absolute"
      top="2"
      insetEnd="2"
      {...props}
      asChild
    >
      <CloseButton size="sm" ref={ref}>
        {props.children}
      </CloseButton>
    </ChakraDialog.CloseTrigger>
  )
})

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  ChakraDialog.TitleProps
>(function DialogTitle(props, ref) {
  return (
    <ChakraDialog.Title {...props} asChild>
      <Heading as="h2" size="lg" lineHeight="1.2" ref={ref}>
        {props.children}
      </Heading>
    </ChakraDialog.Title>
  )
})

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  ChakraDialog.DescriptionProps
>(function DialogDescription(props, ref) {
  return <ChakraDialog.Description color="fg.subtle" {...props} ref={ref} />
})

export const DialogRoot = ChakraDialog.Root
export const DialogFooter = ChakraDialog.Footer
export const DialogHeader = ChakraDialog.Header
export const DialogBody = ChakraDialog.Body
export const DialogBackdrop = ChakraDialog.Backdrop
export const DialogOverlay = ChakraDialog.Backdrop
export const DialogCloseButton = DialogCloseTrigger
export const Dialog = DialogRoot
export const Modal = DialogRoot
export const ModalBody = DialogBody
export const ModalFooter = DialogFooter
export const ModalOverlay = DialogBackdrop
export const ModalHeader = DialogHeader
export const ModalContent = DialogContent
export const ModalCloseButton = DialogCloseTrigger
