import * as yup from 'yup'

import { Observation } from '@fc/types/src/observation'

import { FormFields } from '../../admin' // Add FormTextFields and FormCommonFields imports

export const useObservationSchema = () => {
  return yup.object({
    observation: yup.array().of(
      yup.object({
        content: yup.string().required(),
      }),
    ),
  })
}

export const observationFields: FormFields<Observation> = [
  {
    name: 'observation',
    type: 'relation-array',
    endpoint: 'observations',
  }, // Use the StrapiCollectionEndpoint type annotation
]
