import * as yup from 'yup'

import { Category, FormFields } from '@fc/types'

export const useCategoriesSchema = () => {
  return yup.object({
    slug: yup.string().required(),
    name_en: yup.string().required(),
    name_nl: yup.string().required(),
    name_tr: yup.string().required(),
  })
}

export const categoryFields: FormFields<Category> = [
  { name: 'slug', required: true },
  { name: 'name_en', required: true },
  { name: 'name_nl', required: true },
  { name: 'name_tr', required: true },
]
