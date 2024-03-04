import * as yup from 'yup'

import { Foundation } from '@fc/types'

import { FormFields } from '../../admin'

export const useFoundationsSchema = () => {
  return yup.object({
    name: yup.string().required(),
    bank1: yup.string(),
    iban1: yup.string(),
    bank2: yup.string(),
    iban2: yup.string(),
    email: yup.string().email().required(),
    // TODO
    // contact: yup.string().required(),
  })
}

export const foundationFields: FormFields<Foundation> = [
  { name: 'name', isRequired: true },
  { name: 'bank1' },
  { name: 'IBAN1' },
  { name: 'bank2' },
  { name: 'IBAN2' },
  { name: 'email', isRequired: true },
  // { name: 'contact', isRequired: true },
]
