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
  { name: 'title', isRequired: true },
  { name: 'url', isRequired: true },
  { name: 'description', isRequired: true, type: 'textarea' },
  { name: 'publisher', isRequired: true },
  { name: 'time', type: 'datetime-local' },
  { name: 'category' },
  { name: 'image' },
]
