import { ButtonProps } from '@chakra-ui/react'
import { StrapiEndpoint, StrapiModel } from '@fc/types'
import { AnyObjectSchema } from 'yup'

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
