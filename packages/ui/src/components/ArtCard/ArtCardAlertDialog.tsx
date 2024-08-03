import { FC, useRef } from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react'

import { ArtCardAlertDialogProps } from './types'
import { Button } from '../Button'

export const ArtCardAlertDialog: FC<ArtCardAlertDialogProps> = ({
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
    <AlertDialog
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight={600}>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{text}</AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose} ref={cancelRef}>
              Cancel
            </Button>
            <Button colorPalette={colorPalette} onClick={onClick} ml={3}>
              {buttonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
