import * as yup from 'yup'

import type { Activity, FormFields } from '@fc/types'

import { yupMultiSelect } from './common'

export const useActivitySchema = () => {
  return yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    date: yup.date().required(),
    content: yup.string().required(),
    image: yup.mixed().required(),
    platforms: yupMultiSelect,
    categories: yupMultiSelect,
  })
}

export const activityFields: FormFields<Activity> = [
  { name: 'title', required: true },
  { name: 'description', required: true, type: 'textarea' },
  { name: 'date', required: true, type: 'datetime-local' },

  { name: 'content', required: true, type: 'markdown' },
  { name: 'image', type: 'file', required: true },
  {
    name: 'platforms',
    type: 'select',
    multiple: true,
    endpoint: 'platforms',
  },
  {
    name: 'categories',
    type: 'select',
    multiple: true,
    endpoint: 'categories',
  },
]
