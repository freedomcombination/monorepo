import * as yup from 'yup'

import { Observation } from '@fc/types/src/observation'

import { FormFields } from '../../admin'

export const useObservationSchema = () => {
  return yup.object({
    content: yup.string().required(),
  })
}

export const observationFields: FormFields<Observation> = [
  { name: 'content', isRequired: true, type: 'markdown' },
]
