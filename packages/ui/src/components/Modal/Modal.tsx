import { FC, PropsWithChildren } from 'react'

import { Dialog } from '@chakra-ui/react'

export const Modal = Dialog.Root
export const ModalHeader = Dialog.Header
export const ModalBody = Dialog.Body
export const ModalFooter = Dialog.Footer
export const ModalCloseButton = Dialog.CloseTrigger
export const ModalOverlay = Dialog.Backdrop

export const ModalContent: FC<
  PropsWithChildren<Dialog.ContentProps>
> = props => {
  return (
    <Dialog.Positioner>
      <Dialog.Content {...props} />
    </Dialog.Positioner>
  )
}
