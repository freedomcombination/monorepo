import axios from 'axios'
import { getIronSession } from 'iron-session'
import { NextApiHandler } from 'next'

import { API_URL } from '@fc/config'
import { Mutation } from '@fc/lib'
import { getSecret, sessionOptions } from '@fc/secrets'
import { loginAuth } from '@fc/services'
import { Auth, AuthResponse, ProfileCreateInput } from '@fc/types'

export const registerRouter: NextApiHandler = async (req, res) => {
  const { name, username, email, password } = req.body

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
    }

    await Mutation.post('profiles', body, getSecret('TOKEN'))

    const { profile, ...auth } = await loginAuth(email, password)

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
