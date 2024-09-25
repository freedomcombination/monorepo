import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { DeleteArgs } from './types'

export const deleteHashtagSentence = async (args: DeleteArgs) => {
  const params = new URLSearchParams()
  params.append('hashtagId', args.hashtagId.toString())
  params.append('value', args.value.toString())

  const result = await axios.delete<number>(
    `/api/kv/hashtag-sentences?${params.toString()}`,
  )

  return result.data
}

export const useDeleteHashtagSentenceMutation = () =>
  useMutation({
    mutationKey: ['kv-hashtag-sentences-delete'],
    mutationFn: deleteHashtagSentence,
  })
