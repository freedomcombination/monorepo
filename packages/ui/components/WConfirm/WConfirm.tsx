import { FC, useEffect, useRef } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useBoolean } from 'react-use'

import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogBackdrop,
} from '@fc/chakra'

import { WConfirmProps } from './types'

export const WConfirm: FC<WConfirmProps> = props => {
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
    if (props) setIsOpen(true)
    if (!props) setIsOpen(false)
  }, [props, setIsOpen])

  const handleConfirm = () => {
    onConfirm?.()
    disclosure.onClose()
  }

  const handleCancel = () => {
    onCancel?.()
    setIsOpen(false)
  }

  return (
    <Dialog {...disclosure}>
      <DialogBackdrop>
        <DialogContent>
          <DialogHeader fontSize="lg" fontWeight={700}>
            {title}
          </DialogHeader>

          <DialogBody>{description}</DialogBody>

          <DialogFooter>
            <Button
              data-testid="button-cancel-confirm"
              ref={cancelRef}
              onClick={handleCancel}
              colorPalette={'gray'}
            >
              {t('cancel')}
            </Button>
            <Button
              data-testid="button-confirm"
              colorPalette={isWarning ? 'red' : 'primary'}
              onClick={handleConfirm}
              ml={3}
            >
              {buttonText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogBackdrop>
    </Dialog>
  )
}
