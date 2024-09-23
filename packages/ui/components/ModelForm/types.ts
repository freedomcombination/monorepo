import { TFunction } from 'i18next'
import { Control, FieldErrorsImpl, UseFormReturn } from 'react-hook-form'

import type { FormFields, StrapiModel } from '@fc/types'

export type MentionSelectProps = {
  isEditing: boolean
  control: Control
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
}

export type ModelCreateFormBodyProps<T extends StrapiModel> = {
  fields: FormFields<T>
  activeOption?: string
  formProps: UseFormReturn
  model?: Partial<T>
  isChangingMedia: boolean
  toggleChangingMedia: () => void
  t: TFunction<'common'>
}
