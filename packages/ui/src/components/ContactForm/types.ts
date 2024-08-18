import { InferType } from 'yup'

import { contactSchema } from './schema'

export type ContactFormFieldValues = InferType<typeof contactSchema>

export type ContactFormProps = {
  onSubmitHandler: (data: ContactFormFieldValues) => Promise<void>
  errorMessage?: string
  loading: boolean
  isSuccess: boolean
  isError: boolean
}
