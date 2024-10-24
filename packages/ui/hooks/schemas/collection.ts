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
  { name: 'title', required: true },
  { name: 'date', required: true, type: 'datetime-local' },
  { name: 'description', required: true, type: 'textarea' },
  { name: 'content', required: true, type: 'markdown' },
  { name: 'image', required: true, type: 'file' },
]
