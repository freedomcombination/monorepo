import * as yup from 'yup'

import { Post } from '@fc/types'

import { yupMultiSelect } from './common'
import { FormFields } from '../../admin'

export const usePostSchema = () => {
  return yup.object({
    tags: yupMultiSelect,
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
  { name: 'description', isRequired: true, type: 'textarea' },
  {
    name: 'image',
    type: 'file',
    group: { value: 'image', name: 'media' },
  },
  {
    name: 'tags',
    type: 'select',
    endpoint: 'tags',
    isMulti: true,
  },
  {
    name: 'videoUrl',
    type: 'mediaUrl',
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
