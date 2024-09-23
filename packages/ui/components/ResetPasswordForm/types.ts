import { InferType } from 'yup'

import { resetPasswordSchema } from './schema'

export type ResetPasswordFieldValues = InferType<
  ReturnType<typeof resetPasswordSchema>
>
