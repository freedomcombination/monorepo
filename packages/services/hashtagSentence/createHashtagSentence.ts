import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { CreateArgs } from './types'

export const createHashtagSentence = async (args: CreateArgs) => {
  const result = await axios.post<number>('/api/kv/hashtag-sentences', args, {})

  return result.data
}

export const useCreateHashtagSentenceMutation = () =>
  useMutation({
    mutationKey: ['kv-hashtag-sentences-create'],
    mutationFn: createHashtagSentence,
  })
