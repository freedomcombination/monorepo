import * as yup from 'yup'

import { FormFields, UserFeedback } from '@fc/types'

export const useUserFeedbackSchema = () => {
  return yup.object({
    comment: yup.string(),
    point: yup.string(),
    site: yup.string(),
    image: yup.mixed(),
    processed: yup.boolean(),
    issueLink: yup.string(),
  })
}

export const userFeedbackFields: FormFields<UserFeedback> = [
  { name: 'comment', type: 'textarea', blockEdit: true },
  { name: 'point', blockEdit: true },
  { name: 'site', blockEdit: true },
  { name: 'processed', type: 'boolean' },
  { name: 'issueLink' },
  {
    name: 'image',
    type: 'file',
    group: { value: 'image', name: 'media' },
    blockEdit: true,
  },
]
