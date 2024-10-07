import * as yup from 'yup'

import type { FormFields, Tag } from '@fc/types'

import { yupMultiSelect } from './common'

export const useTagsSchema = () => {
  return yup.object({
    slug: yup.string().required(),
    name_en: yup.string().required(),
    name_nl: yup.string().required(),
    name_tr: yup.string().required(),
    platforms: yupMultiSelect,
  })
}

export const tagFields: FormFields<Tag> = [
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
