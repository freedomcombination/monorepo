import type { StrapiEndpoint, StrapiModel } from '@fc/types'

export type ModelEditFormProps<T extends StrapiModel> = {
  endpoint: StrapiEndpoint
  model: T
  translatedFields?: (keyof T)[]
  noColumns?: boolean
  defaultIsEditing?: boolean
  onSuccess: () => void
  onClose?: () => void
  onCancel?: () => void
}
