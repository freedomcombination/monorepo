import * as yup from 'yup'

import type { FormFields, Post } from '@fc/types'

import { yupSelect } from './common'

export const usePostSchema = () => {
  return yup.object({
    victim: yupSelect,
    prison: yupSelect,
    description: yup.string().required(),
    hashtag: yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
    image: yup.mixed(),
    caps: yup.mixed(),
    video: yup.mixed(),
    videoUrl: yup.string(),
  })
}

export const postFields: FormFields<Post> = [
  { name: 'description', required: true, type: 'textarea' },
  {
    name: 'image',
    type: 'file',
    group: { value: 'image', name: 'media' },
  },
  {
    name: 'victim',
    type: 'select',
    endpoint: 'victims',
  },
  {
    name: 'prison',
    type: 'select',
    endpoint: 'prisons',
  },
  {
    name: 'videoUrl',
    type: 'media-url',
    group: {
      label: 'VideoUrl',
      value: 'videoUrl',
      name: 'media',
    },
  },
  {
    name: 'hashtag',
    type: 'select',
    endpoint: 'hashtags',
  },
  {
    name: 'video',
    type: 'file',
    group: { value: 'video', name: 'media' },
  },
  {
    name: 'caps',
    type: 'file',
    group: { label: 'Caps', value: 'caps', name: 'media' },
  },
]
