import * as yup from 'yup'

import type { Course, FormFields } from '@fc/types'

import { yupSelect } from './common'

export const useCourseSchema = () => {
  return yup.object({
    title_tr: yup.string().required(),
    title_en: yup.string().required(),
    title_nl: yup.string().required(),
    description_tr: yup.string().required(),
    description_nl: yup.string().required(),
    description_en: yup.string().required(),
    content_tr: yup.string().required(),
    content_nl: yup.string().required(),
    content_en: yup.string().required(),
    location: yup.string().required(),
    instructor: yup.string().required(),
    quota: yup.number(),
    price: yup.number(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    lastRegisterDate: yup.date().required(),
    isOnline: yup.bool(),
    image: yup.mixed().required(),
    platform: yupSelect,
    language: yup.mixed().oneOf(['tr', 'nl', 'en']),
    requireApproval: yup.boolean(),
    /*
    assignmentFiles: yup.string().when('requireApproval', ([requireApproval], schema) => {
      if (requireApproval) {
        return schema.required();
      } else {
        return schema.notRequired();
      }
    }),
    */
    assignmentSubmissionDeadline: yup
      .number()
      .when('requireApproval', ([requireApproval], schema) => {
        if (requireApproval) {
          return schema.min(1).required()
        } else {
          return schema.min(0).notRequired()
        }
      }),
    assignmentEvaluationTime: yup
      .number()
      .when('requireApproval', ([requireApproval], schema) => {
        if (requireApproval) {
          return schema.min(1).required()
        } else {
          return schema.min(0).notRequired()
        }
      }),
  })
}

export const courseFields: FormFields<Course> = [
  { name: 'title_tr', isRequired: true },
  { name: 'title_nl', isRequired: true },
  { name: 'title_en', isRequired: true },
  {
    name: 'description_tr',
    isRequired: true,
    type: 'textarea',
  },
  {
    name: 'description_nl',
    isRequired: true,
    type: 'textarea',
  },
  {
    name: 'description_en',
    isRequired: true,
    type: 'textarea',
  },
  {
    name: 'content_nl',
    isRequired: true,
    type: 'markdown',
  },
  {
    name: 'content_tr',
    isRequired: true,
    type: 'markdown',
  },
  {
    name: 'content_en',
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
  { name: 'location', isRequired: true },
  {
    name: 'endDate',
    isRequired: true,
    type: 'date',
  },
  { name: 'lastRegisterDate', isRequired: true, type: 'datetime-local' },
  { name: 'instructor', isRequired: true },
  { name: 'quota', isRequired: true, type: 'number-input' },
  { name: 'price', isRequired: true, type: 'number-input' },
  {
    name: 'platform',
    type: 'select',
    endpoint: 'platforms',
  },
  {
    name: 'requireApproval',
    type: 'boolean',
  },
  {
    name: 'assignmentFiles',
    type: 'file',
  },
  {
    name: 'assignmentSubmissionDeadline',
    type: 'number-input',
  },
  {
    name: 'assignmentEvaluationTime',
    type: 'number-input',
  },
]
