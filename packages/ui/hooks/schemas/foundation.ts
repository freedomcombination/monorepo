import * as yup from 'yup'

import type { Foundation, FormFields } from '@fc/types'

export const useFoundationsSchema = () => {
  return yup.object({
    name: yup.string().required(),
    bank1: yup.string(),
    iban1: yup.string(),
    bank2: yup.string(),
    iban2: yup.string(),
    email: yup.string().email().required(),
    // TODO: Investigate the block type and empty validation: https://stackoverflow.com/a/59069603
    about_tr: yup.mixed().required(),
    about_nl: yup.mixed().required(),
    about_en: yup.mixed().required(),
    // TODO
    // contact: yup.string().required(),
  })
}

export const foundationFields: FormFields<Foundation> = [
  { name: 'name', required: true },
  { name: 'bank1' },
  { name: 'IBAN1' },
  { name: 'bank2' },
  { name: 'IBAN2' },
  { name: 'email', required: true },
  {
    name: 'about_tr',
    required: true,
    type: 'block',
  },
  {
    name: 'about_en',
    required: true,
    type: 'block',
  },

  {
    name: 'about_nl',
    required: true,
    type: 'block',
  },
]
