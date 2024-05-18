import { InferType } from 'yup'

import { observationFormSchema } from './schema'

export type ObservationFormFieldValues = InferType<typeof observationFormSchema>

export type ObservationFormProps = {
  profileId: number
  onSuccess: () => void
}
