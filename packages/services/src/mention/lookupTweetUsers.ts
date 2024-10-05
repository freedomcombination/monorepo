import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { API_URL } from '@fc/config'
import { MentionUserData } from '@fc/types'

export const lookupTwitterUsers = async (
  q?: string,
): Promise<MentionUserData[]> => {
  if (!q) return []

  const response = await axios(`${API_URL}/api/mentions/search?q=${q}`)
  const rawData = response.data as MentionUserData[]

  return rawData.sort((a, b) => b.followers_count - a.followers_count)
}

export const useLookupTwitterUsers = (q?: string) => {
  return useQuery({
    queryKey: ['mentions-search', q],
    queryFn: () => lookupTwitterUsers(q),
    enabled: q?.length ? q.length > 3 : false,
    placeholderData: previousData => previousData,
  })
}
