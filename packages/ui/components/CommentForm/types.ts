import { InferType } from 'yup'

import { commentFormSchema } from './schema'

export type CommentFormFieldValues = InferType<typeof commentFormSchema>

export type CommentFormProps = {
  artId: number
  onSuccess: () => void
}
