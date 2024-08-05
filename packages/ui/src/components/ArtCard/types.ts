import { Art } from '@fc/types'

import { ButtonProps } from '../Button'

export type ArtActionType = 'delete' | 'publish' | 'unpublish'

export type ArtActionContext = {
  buttonText: string
  colorPalette: ButtonProps['colorPalette']
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
