import { forwardRef, RefObject } from 'react'

import { Text, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { CreateArtSuccessAlertProps } from './types'
import { Button } from '../Button'
import { ButtonLink } from '../ButtonLink'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '../Modal'

export const ArtCreateSuccessAlert = forwardRef<
  HTMLButtonElement,
  CreateArtSuccessAlertProps
>(({ isOpen, onClose }, ref) => {
  const { t } = useTranslation()
  const { asPath } = useRouter()

  return (
    <Modal
      closeOnOverlayClick={false}
      centered
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={ref as RefObject<HTMLButtonElement>}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          bg="primary.500"
          color="white"
          fontSize="lg"
          fontWeight={600}
        >
          {t('art.create.success.title')}
        </ModalHeader>

        <ModalBody py={4}>
          <Stack gap={4}>
            <Text>{t('art.create.success.description')}</Text>

            {!asPath?.includes('profile') && (
              <ButtonLink href="/profile">
                {t('art.create.success.link')}
              </ButtonLink>
            )}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>{t('dismiss')}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
})

ArtCreateSuccessAlert.displayName = 'ArtCreateSuccessAlert'
