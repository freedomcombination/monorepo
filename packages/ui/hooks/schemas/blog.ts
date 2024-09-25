import * as yup from 'yup'

import type { Blog, FormFields } from '@fc/types'

import { yupMultiSelect, yupSelect } from './common'

export const useBlogSchema = () => {
  return yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    content: yup.string().required(),
    categories: yupMultiSelect,
    tags: yupMultiSelect,
    author: yupSelect,
    image: yup.mixed().required(),
  })
}

export const blogFields: FormFields<Blog> = [
  { name: 'title', isRequired: true },
  { name: 'description', isRequired: true, type: 'textarea' },
  { name: 'image', type: 'file', isRequired: true },
  { name: 'content', isRequired: true, type: 'markdown' },
  {
    name: 'categories',
    type: 'select',
    isMulti: true,
    endpoint: 'categories',
  },
  {
    name: 'tags',
    type: 'select',
    isMulti: true,
    endpoint: 'tags',
  },
  {
    name: 'author',
    type: 'select',
    isMulti: false,
    endpoint: 'profiles',
  },
]
