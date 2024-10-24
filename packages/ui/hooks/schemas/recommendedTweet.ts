import * as yup from 'yup'

import type { FormFields, RecommendedTweet } from '@fc/types'

export const useRecommendedTweetSchema = () => {
  return yup.object({
    text: yup.string().required(),
    mentions: yup.array().of(
      yup.object().shape({
        label: yup.string(),
        value: yup.string(),
      }),
    ),
    image: yup.mixed(),
    caps: yup.mixed(),
    video: yup.mixed(),
    videoUrl: yup.string(),
  })
}

export const recommendedTweetFields: FormFields<RecommendedTweet> = [
  { name: 'text', required: true, type: 'textarea' },
  {
    name: 'image',
    type: 'file',
    group: { value: 'image', name: 'media' },
  },
  {
    name: 'video',
    type: 'file',
    group: { value: 'video', name: 'media' },
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
    name: 'caps',
    type: 'file',
    group: { label: 'Caps', value: 'caps', name: 'media' },
  },
  {
    name: 'mentions',
    type: 'select',
    endpoint: 'mentions',
    multiple: true,
  },
]
