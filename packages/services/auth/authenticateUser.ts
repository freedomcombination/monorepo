import axios from 'axios'

import { API_URL } from '@fc/config/constants'
import type { Auth, AuthResponse, Profile } from '@fc/types'

import { getSessionUser } from './getSessionUser'
import { strapiRequest } from '../common/request'

const emptyAuth: Auth = {
  user: null,
  token: null,
  profile: null,
  profileId: null,
}

export const authenticateUser = async (
  identifier: string,
  password: string,
) => {
  // TODO Can we populate the AuthResponse with the user data from the backend?
  // Why do we need to make a new request to get populated user data?
  const response = await axios.post<AuthResponse>(
    'api/auth/local',
    { identifier, password },
    { baseURL: API_URL },
  )

  const token = response.data?.jwt

  if (!token) {
    return emptyAuth
  }

  const user = await getSessionUser(token)

  if (!user) {
    return emptyAuth
  }

  const profileResponse = user?.id
    ? await strapiRequest<Profile>({
        endpoint: 'profiles/me',
        token,
      })
    : null

  const profile = profileResponse?.data || null

  const auth: Auth = {
    user,
    token,
    profile,
    profileId: profile?.id || null,
  }

  return auth
}
