import { ButtonProps } from '@chakra-ui/react'
import { AnyObjectSchema } from 'yup'

import type { FormFields, StrapiEndpoint, StrapiModel } from '@fc/types'

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
