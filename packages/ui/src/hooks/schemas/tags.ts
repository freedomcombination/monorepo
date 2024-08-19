import * as yup from 'yup'

import { FormFields, Tag } from '@fc/types'

export const useTagsSchema = () => {
  return yup.object({
    slug: yup.string().required(),
    name_en: yup.string().required(),
    name_nl: yup.string().required(),
    name_tr: yup.string().required(),
  })
}

export const tagFields: FormFields<Tag> = [
  { name: 'slug', required: true },
  { name: 'name_en', required: true },
  { name: 'name_nl', required: true },
  { name: 'name_tr', required: true },
]
