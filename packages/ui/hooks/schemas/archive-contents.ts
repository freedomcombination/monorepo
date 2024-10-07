import * as yup from 'yup'

import type { ArchiveContent, FormFields } from '@fc/types'

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
  { name: 'date', isRequired: true, type: 'date' },
  { name: 'title', isRequired: true },
  {
    name: 'categories',
    type: 'select',
    isMulti: true,
    endpoint: 'categories',
    isRequired: true,
  },
  { name: 'source', isRequired: true },
  {
    name: 'victims',
    type: 'select',
    isMulti: true,
    endpoint: 'victims',
  },
  {
    name: 'prisons',
    type: 'select',
    isMulti: true,
    endpoint: 'prisons',
  },
  { name: 'link', isRequired: true },
  { name: 'content', isRequired: true, type: 'markdown' },
]
