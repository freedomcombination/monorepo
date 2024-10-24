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
  { name: 'title_tr', required: true },
  { name: 'title_nl', required: true },
  { name: 'title_en', required: true },
  {
    name: 'description_tr',
    required: true,
    type: 'textarea',
  },
  {
    name: 'description_nl',
    required: true,
    type: 'textarea',
  },
  {
    name: 'description_en',
    required: true,
    type: 'textarea',
  },
  {
    name: 'content_nl',
    required: true,
    type: 'markdown',
  },
  {
    name: 'content_tr',
    required: true,
    type: 'markdown',
  },
  {
    name: 'content_en',
    required: true,
    type: 'markdown',
  },
  { name: 'image', required: true, type: 'file' },
  { name: 'isOnline', type: 'boolean' },
  { name: 'language', required: true },
  {
    name: 'startDate',
    required: true,
    type: 'date',
  },
  { name: 'location', required: true },
  {
    name: 'endDate',
    required: true,
    type: 'date',
  },
  { name: 'lastRegisterDate', required: true, type: 'datetime-local' },
  { name: 'instructor', required: true },
  { name: 'quota', required: true, type: 'number-input' },
  { name: 'price', required: true, type: 'number-input' },
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
