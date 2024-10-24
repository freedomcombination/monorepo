import { FC, useRef } from 'react'

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  Button,
} from '@fc/chakra'

import { ArtCardAlertDialogProps } from './types'

export const ArtCardDialog: FC<ArtCardAlertDialogProps> = ({
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
    <Dialog
      placement={'center'}
      open={isOpen}
      onOpenChange={e => (e.open ? null : onClose())}
    >
      <DialogOverlay>
        <DialogContent>
          <DialogHeader fontSize="lg" fontWeight={600}>
            {title}
          </DialogHeader>

          <DialogBody>{text}</DialogBody>

          <DialogFooter>
            <Button onClick={onClose} ref={cancelRef}>
              Cancel
            </Button>
            <Button colorPalette={colorPalette} onClick={onClick} ml={3}>
              {buttonText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
