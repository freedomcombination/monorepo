import * as yup from 'yup'

import { FormFields, RecommendedTopic } from '@fc/types'

export const useTopicSchema = () => {
  return yup.object({
    title: yup.string().required(),
    url: yup.string(),
    description: yup.string().required(),
    publisher: yup.string().required(),
    category: yup.string(),
    time: yup.date(),
    image: yup.mixed(),
  })
}

export const topicFields: FormFields<RecommendedTopic> = [
  { name: 'title', required: true },
  { name: 'url', required: true },
  { name: 'description', required: true, type: 'textarea' },
  { name: 'publisher', required: true },
  { name: 'time', type: 'datetime-local' },
  { name: 'category' },
  { name: 'image' },
]
