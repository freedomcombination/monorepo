import { Profile } from '../profile'
import { User } from '../user'

export type SessionUser = Pick<
  User,
  'id' | 'username' | 'email' | 'confirmed' | 'blocked'
> & {
  roles: string[]
}

export type Auth = {
  user: SessionUser | null
  profile: Profile | null
  profileId: number | null
  token: string | null
}

export type AuthResponse = {
  jwt: string
  user: {
    id: number | null
    username: string | null
    email: string | null
    provider: string | null
    confirmed: boolean | null
    blocked: boolean | null
    createdAt: string | null
    updatedAt: string | null
  }
}
