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
  { name: 'slug', isRequired: true },
  { name: 'name_en', isRequired: true },
  { name: 'name_nl', isRequired: true },
  { name: 'name_tr', isRequired: true },
  {
    name: 'platforms',
    isRequired: false,
    type: 'select',
    isMulti: true,
    endpoint: 'platforms',
  },
]
