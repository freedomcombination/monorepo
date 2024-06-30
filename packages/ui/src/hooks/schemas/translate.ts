import * as yup from 'yup'

import { FormFields, Post, StrapiTranslatableModel } from '@fc/types'

export const translateModelSchema = yup.object({
  title: yup.string(),
  description: yup.string(),
  content: yup.string(),
})

export const translatePostModelSchema = yup.object({
  description: yup.string(),
  content: yup.string(),
})

export const translateModelFields: FormFields<
  Exclude<StrapiTranslatableModel, Post>
> = [
  { name: 'title' },
  { name: 'description', type: 'textarea' },
  { name: 'content', type: 'markdown' },
]
export const translatePostModelFields: FormFields<StrapiTranslatableModel> = [
  { name: 'description', type: 'textarea' },
  { name: 'content', type: 'markdown' },
]
