import { FieldValues, Path, UseFormSetValue } from 'react-hook-form'

import type { StrapiEndpoint, StrapiModel } from '@fc/types'

export type ModelMediaProps<T extends FieldValues = FieldValues> = {
  model: StrapiModel
  name?: Path<T>
  isEditing: boolean
  isChangingMedia: boolean
  toggleChangingMedia: () => void
  setValue: UseFormSetValue<T>
  endpoint?: StrapiEndpoint
}
