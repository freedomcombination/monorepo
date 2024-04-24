import * as yup from 'yup'

import { Hashtag } from '@fc/types'

import { yupMultiSelect, yupSelect } from './common'
import { FormFields } from '../../admin'

export const useHashtagSchema = () => {
  return yup.object({
    title: yup.string().required(),
    date: yup.date().required(),
    description: yup.string().required(),
    content: yup.string(),
    hashtagDefault: yup.string().required(),
    hashtagExtra: yup.string(),
    categories: yupMultiSelect,
    mentions: yupMultiSelect,
    platforms: yupSelect,
    image: yup.mixed().required(),
  })
}

export const hashtagFields: FormFields<Hashtag> = [
  { name: 'title', isRequired: true },
  { name: 'date', type: 'datetime-local', isRequired: true },
  { name: 'description', isRequired: true, type: 'textarea' },
  { name: 'image', type: 'file', isRequired: true },
  { name: 'platform', type: 'select', endpoint: 'platforms', isMulti: false },
  { name: 'content', type: 'markdown' },
  {
    name: 'hashtagDefault',
    isRequired: true,
  },
  { name: 'hashtagExtra' },
  {
    name: 'mentions',
    type: 'select',
    endpoint: 'mentions',
    isMulti: true,
  },
  {
    name: 'categories',
    type: 'select',
    endpoint: 'categories',
    isMulti: true,
  },
]
