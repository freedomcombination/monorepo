import * as yup from 'yup'

import { CourseApplication, FormFields } from '@fc/types'

import { yupSelect } from './common'

export const useCourseApplicationSchema = () => {
  return yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    city: yup.string(),
    country: yup.string().required(),
    phone: yup.string().required(),
    message: yup.string().required(),
    installmentCount: yup.number(),
    hasPaid: yup.boolean(),
    notes: yup.string(),
    course: yupSelect,
  })
}

export const courseApplicationFields: FormFields<CourseApplication> = [
  { name: 'name', required: true },
  { name: 'email', required: true },
  { name: 'city' },
  { name: 'country', required: true },
  { name: 'phone', required: true },
  { name: 'installmentCount', type: 'number-input' },
  { name: 'hasPaid', type: 'boolean' },
  { name: 'message', required: true, type: 'textarea' },
  {
    name: 'course',
    type: 'select',
    endpoint: 'courses',
  },
  { name: 'notes', type: 'textarea' },
]
