import * as yup from 'yup'

import type { ArchiveContent, FormFields } from '@fc/types'

import { yupMultiSelect } from './common'

export const useArchiveContentsSchema = () => {
  return yup.object({
    title: yup.string().required(),
    date: yup.date().required(),
    categories: yupMultiSelect,
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
    multiple: true,
    endpoint: 'categories',
    required: true,
  },
  { name: 'source', required: true },
  {
    name: 'victims',
    type: 'select',
    multiple: true,
    endpoint: 'victims',
  },
  {
    name: 'prisons',
    type: 'select',
    multiple: true,
    endpoint: 'prisons',
  },
  { name: 'link', required: true },
  { name: 'content', required: true, type: 'markdown' },
]
