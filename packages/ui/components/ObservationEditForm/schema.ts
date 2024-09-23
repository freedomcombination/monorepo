import * as yup from 'yup'

import type { Observation, FormFields } from '@fc/types'

export const observationSchema = () => {
  return yup.object({
    content: yup.string().required(),
  })
}

export const observationFields: FormFields<Observation> = [
  { name: 'content', required: true, type: 'markdown' },
]
