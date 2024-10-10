import * as yup from 'yup'

import type { Tweet } from '@fc/types'

import { createTweetSchema } from './schema'

export type CreateTweetFormFieldValues = yup.InferType<typeof createTweetSchema>

export type CreateTweetFormProps = {
  onSubmit?: (data: CreateTweetFormFieldValues) => void
  onClose: () => void
  isOpen: boolean
  originalTweet: Partial<Tweet>
  isNews: boolean
}
