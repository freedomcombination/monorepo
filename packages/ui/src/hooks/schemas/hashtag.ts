import * as yup from 'yup'

import { Hashtag, FormFields } from '@fc/types'

import { yupMultiSelect, yupSelect } from './common'

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
  { name: 'title', required: true },
  { name: 'date', type: 'datetime-local', required: true },
  { name: 'description', required: true, type: 'textarea' },
  { name: 'image', type: 'file', required: true },
  { name: 'platform', type: 'select', endpoint: 'platforms', isMulti: false },
  { name: 'content', type: 'markdown' },
  {
    name: 'hashtagDefault',
    required: true,
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
