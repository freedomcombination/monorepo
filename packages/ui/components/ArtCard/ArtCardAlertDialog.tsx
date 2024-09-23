import { FC, useRef } from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'

import { ArtCardAlertDialogProps } from './types'

export const ArtCardAlertDialog: FC<ArtCardAlertDialogProps> = ({
  buttonText,
  colorScheme,
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
            <Button colorScheme={colorScheme} onClick={onClick} ml={3}>
              {buttonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
