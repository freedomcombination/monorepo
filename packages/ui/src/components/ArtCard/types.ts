import { ThemeTypings } from '@chakra-ui/react'

import { Art } from '@fc/types'

export type ArtActionType = 'delete' | 'publish' | 'unpublish'

export type ArtActionContext = {
  buttonText: string
  colorScheme: ThemeTypings['colorSchemes']
  text: string
  title: string
  onClick: () => void
}

export type ArtActions = Record<ArtActionType, ArtActionContext>

export type ArtCardProps = {
  art: Art
  isMasonry?: boolean
  isModal?: boolean
  refetch?: () => void
  recaptchaToken?: string
  imageHeight?: number
}

export type ArtCardAlertDialogProps = {
  isOpen: boolean
  onClose: () => void
} & ArtActionContext

export type ArtCardActionsProps = {
  isPublished: boolean
  onHandleAction: (type: ArtActionType) => void
}
