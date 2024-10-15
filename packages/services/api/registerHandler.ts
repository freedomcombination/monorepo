import axios from 'axios'
import { getIronSession } from 'iron-session'
import { NextApiHandler } from 'next'

import { API_URL } from '@fc/config/constants'
import { sessionOptions } from '@fc/secrets'
import { authenticateUser } from '@fc/services/auth/authenticateUser'
import type { Auth, AuthResponse, Profile, ProfileCreateInput } from '@fc/types'

import { mutation } from '../common/mutation'

export const registerHandler: NextApiHandler = async (req, res) => {
  const { name, username, email, password, locale } = req.body

  const trimmedName = name.trim()
  const trimmedUsername = username.trim()
  const trimmedEmail = email.trim()

  try {
    const response = await axios.post<AuthResponse>(
      'api/auth/local/register',
      { username: trimmedUsername, email: trimmedEmail, password },
      { baseURL: API_URL },
    )

    const userId = response.data.user?.id as number

    const body: ProfileCreateInput = {
      user: userId,
      name: trimmedName,
      email: trimmedEmail,
      locale: ['en', 'nl', 'tr'].includes(locale) ? locale : 'en',
    }

    await mutation<Profile, ProfileCreateInput>({
      endpoint: 'profiles',
      method: 'post',
      body,
      token: response.data.jwt,
    })

    const { profile, ...auth } = await authenticateUser(email, password)

    const session = await getIronSession<Auth>(req, res, sessionOptions)

    session.user = auth.user
    session.token = auth.token
    session.profileId = profile?.id || null

    await session.save()
    res.json({ ...auth, profile })
  } catch (error: any) {
    if (error.response?.data?.error) {
      console.error('REGISTER_AUTH_ERROR', error.response.data.error)

      return res.json(error.response.data.error)
    }
    res.status(500).json({ message: 'Something went wrong' })
  }
}
