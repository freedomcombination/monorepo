import { FC, useEffect, useRef } from 'react'

import { useDisclosure, useBoolean } from '@chakra-ui/hooks'
import { useTranslation } from 'next-i18next'

import { WConfirmProps } from './types'
import { Button } from '../Button'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '../Modal'

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
    <Modal leastDestructiveRef={cancelRef} {...disclosure}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader fontSize="lg" fontWeight={700}>
            {title}
          </ModalHeader>

          <ModalBody>{description}</ModalBody>

          <ModalFooter>
            <Button
              ref={cancelRef}
              onClick={handleCancel}
              colorPalette={'gray'}
            >
              {t('cancel')}
            </Button>
            <Button
              colorPalette={isWarning ? 'red' : 'primary'}
              onClick={handleConfirm}
              ml={3}
            >
              {buttonText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}
