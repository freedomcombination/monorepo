import { FC, useEffect, useRef } from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useBoolean,
  useDisclosure,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

export type WConfirmProps = {
  buttonText?: string
  description?: string
  isWarning?: boolean
  title?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export const WConfirm: FC<WConfirmProps> = (props: WConfirmProps) => {
  const { t } = useTranslation()

  const { buttonText, description, isWarning, title, onConfirm, onCancel } =
    props
  const [isOpen, setIsOpen] = useBoolean(!!props)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const disclosure = useDisclosure()

  useEffect(() => {
    if (isOpen) disclosure.onOpen()
    if (!isOpen) disclosure.onClose()
  }, [isOpen, disclosure])

  useEffect(() => {
    if (props) setIsOpen.on()
    if (!props) setIsOpen.off()
  }, [props, setIsOpen])

  const handleConfirm = () => {
    onConfirm?.()
    disclosure.onClose()
  }

  const handleCancel = () => {
    onCancel?.()
    setIsOpen.off()
  }

  return (
    <AlertDialog leastDestructiveRef={cancelRef} {...disclosure}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight={700}>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleCancel} colorScheme={'gray'}>
              {t('cancel')}
            </Button>
            <Button
              colorScheme={isWarning ? 'red' : 'primary'}
              onClick={handleConfirm}
              ml={3}
            >
              {buttonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
