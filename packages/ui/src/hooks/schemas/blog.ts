import * as yup from 'yup'

import { Blog, FormFields } from '@fc/types'

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
  { name: 'title', required: true },
  { name: 'description', required: true, type: 'textarea' },
  { name: 'image', type: 'file', required: true },
  { name: 'content', required: true, type: 'markdown' },
  {
    name: 'categories',
    type: 'select',
    multiple: true,
    endpoint: 'categories',
  },
  {
    name: 'tags',
    type: 'select',
    multiple: true,
    endpoint: 'tags',
  },
  {
    name: 'author',
    type: 'select',
    multiple: false,
    endpoint: 'profiles',
  },
]
