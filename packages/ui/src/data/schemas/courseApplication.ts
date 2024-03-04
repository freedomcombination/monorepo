import * as yup from 'yup'

import { CourseApplication } from '@fc/types'

import { yupSelect } from './common'
import { FormFields } from '../../admin'

export const useCourseApplicationSchema = () => {
  return yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    city: yup.string(),
    country: yup.string().required(),
    phone: yup.string().required(),
    message: yup.string().required(),
    hasPaid: yup.boolean(),
    notes: yup.string(),
    course: yupSelect,
  })
}

export const courseApplicationFields: FormFields<CourseApplication> = [
  { name: 'name', isRequired: true },
  { name: 'email', isRequired: true },
  { name: 'city' },
  { name: 'country', isRequired: true },
  { name: 'phone', isRequired: true },
  { name: 'hasPaid', type: 'boolean' },
  { name: 'message', isRequired: true, type: 'textarea' },
  {
    name: 'course',
    type: 'select',
    endpoint: 'courses',
  },
  { name: 'notes', type: 'textarea' },
]
