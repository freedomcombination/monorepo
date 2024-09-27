import * as yup from 'yup'

import { createUserFeedbackSchema } from './schema'

export type CreateUserFeedbackFormFieldValues = yup.InferType<
  typeof createUserFeedbackSchema
>

export type CreateUserFeedbackFormProps = {
  isOpen: boolean
  onClose: () => void
}
