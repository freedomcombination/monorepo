import * as yup from 'yup'

import { Course } from '@fc/types'

import { yupSelect } from './common'
import { FormFields } from '../../admin'

export const useCourseSchema = () => {
  return yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    content: yup.string().required(),
    location: yup.string().required(),
    instructor: yup.string().required(),
    quota: yup.number(),
    price: yup.number(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    isOnline: yup.bool(),
    image: yup.mixed().required(),
    platform: yupSelect,
    language: yup.mixed().oneOf(['tr', 'nl', 'en']),
  })
}

export const courseFields: FormFields<Course> = [
  { name: 'title', isRequired: true },
  {
    name: 'description',
    isRequired: true,
    type: 'textarea',
  },
  {
    name: 'content',
    isRequired: true,
    type: 'markdown',
  },
  { name: 'image', isRequired: true, type: 'file' },
  { name: 'isOnline', type: 'boolean' },
  { name: 'language', isRequired: true },
  {
    name: 'startDate',
    isRequired: true,
    type: 'date',
  },
  {
    name: 'endDate',
    isRequired: true,
    type: 'date',
  },
  { name: 'location', isRequired: true },
  { name: 'instructor', isRequired: true },
  { name: 'quota', isRequired: true, type: 'number-input' },
  { name: 'price', isRequired: true, type: 'number-input' },
  {
    name: 'tags',
    type: 'select',
    isMulti: true,
    endpoint: 'tags',
  },
  {
    name: 'platform',
    type: 'select',
    endpoint: 'platforms',
  },
]
