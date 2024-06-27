import { InferType } from 'yup'

import { observationFormSchema } from './schema'

export type ObservationCreateFormFieldValues = InferType<
  typeof observationFormSchema
>

export type ObservationCreateFormProps = {
  profileId: number
  onSuccess?: () => void
}
