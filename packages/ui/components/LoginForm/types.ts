import { InferType } from 'yup'

import { loginSchema } from './schema'

export type LoginFormFieldValues = InferType<typeof loginSchema>
