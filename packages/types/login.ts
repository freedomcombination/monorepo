import { Me } from './me'

export type RegisterInput = {
  email: string
  password: string
  username: string
}

export type LoginInput = {
  identifier: string
  password: string
  provider?: string
}

export type LoginPayload = {
  jwt: string
  user: Me
}
