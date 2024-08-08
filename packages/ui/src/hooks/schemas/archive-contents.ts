import * as yup from 'yup'

import { ArchiveContent, FormFields } from '@fc/types'

import { yupMultiSelect } from './common'

export const useArchiveContentsSchema = () => {
  return yup.object({
    title: yup.string().required(),
    date: yup.date().required(),
    categories: yupMultiSelect,
    tags: yupMultiSelect,
    content: yup.string().required(),
    source: yup.string().required(),
    link: yup.string().required(),
  })
}

export const archiveContentFields: FormFields<ArchiveContent> = [
  { name: 'date', required: true, type: 'date' },
  { name: 'title', required: true },
  {
    name: 'categories',
    type: 'select',
    isMulti: true,
    endpoint: 'categories',
    required: true,
  },
  { name: 'source', required: true },
  {
    name: 'tags',
    type: 'select',
    isMulti: true,
    endpoint: 'tags',
  },
  { name: 'link', required: true },
  { name: 'content', required: true, type: 'markdown' },
]
