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
  { name: 'title', isRequired: true },
  { name: 'description', isRequired: true, type: 'textarea' },
  { name: 'date', isRequired: true, type: 'datetime-local' },

  { name: 'content', isRequired: true, type: 'markdown' },
  { name: 'image', type: 'file', isRequired: true },
  {
    name: 'platforms',
    type: 'select',
    isMulti: true,
    endpoint: 'platforms',
  },
  {
    name: 'categories',
    type: 'select',
    isMulti: true,
    endpoint: 'categories',
  },
]
