import { forwardRef, RefObject } from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { CreateArtSuccessAlertProps } from './types'
import { ButtonLink } from '../ButtonLink'

export const ArtCreateSuccessAlert = forwardRef<
  HTMLButtonElement,
  CreateArtSuccessAlertProps
>(({ isOpen, onClose }, ref) => {
  const { t } = useTranslation()

  return (
    <AlertDialog
      closeOnOverlayClick={false}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={ref as RefObject<HTMLButtonElement>}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            bg="primary.500"
            color="white"
            fontSize="lg"
            fontWeight={600}
          >
            {t('art.create.success.title')}
          </AlertDialogHeader>

          <AlertDialogBody py={4}>
            <Text>{t('art.create.success.description')}</Text>

            <ButtonLink href="/profile">
              {t('art.create.success.link')}
            </ButtonLink>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>{t('dismiss')}</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
})

ArtCreateSuccessAlert.displayName = 'ArtCreateSuccessAlert'
