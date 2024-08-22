import { InferType } from 'yup'

import { contactSchema } from './schema'

export type ContactFormFieldValues = InferType<typeof contactSchema>
