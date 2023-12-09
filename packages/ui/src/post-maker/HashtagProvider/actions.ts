import axios from 'axios'

import { API_URL } from '@wsvvrijheid/config'
import { PUBLIC_TOKEN } from '@wsvvrijheid/config'
import { MentionUserData } from '@wsvvrijheid/types'

export const searchMentions = async (value: string) => {
  const response = await axios<MentionUserData[]>(
    `${API_URL}/api/mentions/search?q=${value}`,
    {
      headers: {
        Authorization: `Bearer ${PUBLIC_TOKEN}`,
      },
    },
  )
  const rawData = response.data

  return rawData.sort((a, b) => b.followers_count - a.followers_count)
}
