import * as yup from 'yup'

import type { Category, FormFields } from '@fc/types'

import { yupMultiSelect } from './common'

export const useCategoriesSchema = () => {
  return yup.object({
    slug: yup.string().required(),
    name_en: yup.string().required(),
    name_nl: yup.string().required(),
    name_tr: yup.string().required(),
    platforms: yupMultiSelect,
  })
}

export const categoryFields: FormFields<Category> = [
  { name: 'slug', required: true },
  { name: 'name_en', required: true },
  { name: 'name_nl', required: true },
  { name: 'name_tr', required: true },
  {
    name: 'platforms',
    required: false,
    type: 'select',
    multiple: true,
    endpoint: 'platforms',
  },
]
