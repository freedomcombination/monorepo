import { AnyObjectSchema } from 'yup'

import { FormFields, StrapiEndpoint, StrapiModel } from '@fc/types'

import { ButtonProps } from '../Button'

export type ModelCreateFormProps<T extends StrapiModel> = {
  endpoint: StrapiEndpoint
  fields: FormFields<T>
  model?: Partial<T>
  schema: AnyObjectSchema
  buttonProps?: ButtonProps
  shouldPublish?: boolean
  initialValues?: Partial<T>
  onSuccess?: () => void
}
