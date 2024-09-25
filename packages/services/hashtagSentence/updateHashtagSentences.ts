import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { UpdateArgs } from './types'

export const updateHashtagSentences = async (args: UpdateArgs) => {
  const result = await axios.put<'OK'>('/api/kv/hashtag-sentences', args)

  return result.data
}

export const useUpdateHashtagSentenceMutation = () =>
  useMutation({
    mutationKey: ['kv-hashtag-sentences-update'],
    mutationFn: updateHashtagSentences,
  })
