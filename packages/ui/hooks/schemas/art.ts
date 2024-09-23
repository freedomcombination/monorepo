import * as yup from 'yup'

import type { Art, FormFields } from '@fc/types'

import { yupMultiSelect } from './common'

export const useArtSchema = () => {
  return yup.object({
    title_en: yup.string().required(),
    title_nl: yup.string().required(),
    title_tr: yup.string().required(),
    description_en: yup.string().required(),
    description_nl: yup.string().required(),
    description_tr: yup.string().required(),
    categories: yupMultiSelect,
  })
}

export const artFields: FormFields<Art> = [
  { name: 'title_en', required: true },
  { name: 'title_nl', required: true },
  { name: 'title_tr', required: true },
  {
    name: 'description_en',
    required: true,
    type: 'textarea',
  },
  {
    name: 'description_nl',
    required: true,
    type: 'textarea',
  },
  {
    name: 'description_tr',
    required: true,
    type: 'textarea',
  },
  {
    name: 'artist',
    type: 'select',
    endpoint: 'profiles',
  },
  {
    name: 'categories',
    type: 'select',
    multiple: true,
    endpoint: 'categories',
  },
]
