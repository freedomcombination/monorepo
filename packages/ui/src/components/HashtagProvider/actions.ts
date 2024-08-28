import axios from 'axios'

import { API_URL } from '@fc/config'
import { MentionUserData } from '@fc/types'

export const searchMentions = async (value: string) => {
  const response = await axios<MentionUserData[]>(
    `${API_URL}/api/mentions/search?q=${value}`,
  )
  const rawData = response.data

  return rawData.sort((a, b) => b.followers_count - a.followers_count)
}
