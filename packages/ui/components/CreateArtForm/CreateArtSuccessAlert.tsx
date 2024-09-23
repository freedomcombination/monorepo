import { forwardRef } from 'react'

import { Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
} from '@fc/chakra'

import { CreateArtSuccessAlertProps } from './types'
import { ButtonLink } from '../ButtonLink'

export const ArtCreateSuccessAlert = forwardRef<
  HTMLButtonElement,
  CreateArtSuccessAlertProps
>(({ isOpen, onClose }, ref) => {
  const { t } = useTranslation()
  const { asPath } = useRouter()

  return (
    <Dialog
      closeOnInteractOutside={false}
      centered
      open={isOpen}
      onOpenChange={e => (e.open ? null : onClose())}
    >
      <DialogOverlay>
        <DialogContent>
          <DialogHeader
            data-testid="text-create-art-success"
            bg="primary.500"
            color="white"
            fontSize="lg"
            fontWeight={600}
          >
            {t('art.create.success.title')}
          </DialogHeader>

          <DialogBody py={4}>
            <Stack gap={4}>
              <Text>{t('art.create.success.description')}</Text>

              {!asPath?.includes('profile') && (
                <ButtonLink data-testid="link-goto-profile" href="/profile">
                  {t('art.create.success.link')}
                </ButtonLink>
              )}
            </Stack>
          </DialogBody>

          <DialogFooter>
            <Button ref={ref} onClick={onClose}>
              {t('dismiss')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
})

ArtCreateSuccessAlert.displayName = 'ArtCreateSuccessAlert'
