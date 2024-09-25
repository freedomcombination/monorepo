import * as yup from 'yup'

import type { FormFields, Tag } from '@fc/types'

export const useTagsSchema = () => {
  return yup.object({
    slug: yup.string().required(),
    name_en: yup.string().required(),
    name_nl: yup.string().required(),
    name_tr: yup.string().required(),
  })
}

export const tagFields: FormFields<Tag> = [
  { name: 'slug', isRequired: true },
  { name: 'name_en', isRequired: true },
  { name: 'name_nl', isRequired: true },
  { name: 'name_tr', isRequired: true },
]
