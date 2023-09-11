import * as yup from 'yup'

import { RecommendedTweet } from '@wsvvrijheid/types'

import { FormFields } from '../../admin'

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
  { name: 'text', isRequired: true, type: 'textarea' },
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
    type: 'mediaUrl',
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
    isMulti: true,
  },
]
