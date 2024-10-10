import * as yup from 'yup'

import type { Collection, FormFields } from '@fc/types'

export const useCollectionSchema = () => {
  return yup.object({
    title: yup.string().required(),
    date: yup.date().required(),
    description: yup.string().required(),
    content: yup.string().required(),
    image: yup.mixed().required(),
  })
}

export const collectionFields: FormFields<Collection> = [
  { name: 'title', isRequired: true },
  { name: 'date', isRequired: true, type: 'datetime-local' },
  { name: 'description', isRequired: true, type: 'textarea' },
  { name: 'content', isRequired: true, type: 'markdown' },
  { name: 'image', isRequired: true, type: 'file' },
]
