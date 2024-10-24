import axios from 'axios'

import { API_URL } from '@fc/config/constants'
import type { User } from '@fc/types'
import { mapSessionUser } from '@fc/utils/mapSessionUser'

export const getSessionUser = async (token: string) => {
  const userData = await axios('api/users/me', {
    params: { populate: '*' },
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!userData?.data) {
    return null
  }

  const sessionUser = mapSessionUser(userData.data as unknown as User)

  return sessionUser
}
