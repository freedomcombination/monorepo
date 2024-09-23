import * as yup from 'yup'

import type { FormFields, User } from '@fc/types'

import { yupSelect } from './common'

export const useUserSchema = () => {
  return yup.object({
    username: yup.string().required(),
    role: yupSelect.required(),
    email: yup.string().email().required(),
    confirmed: yup.boolean(),
    blocked: yup.boolean(),
    provider: yup.string(),
  })
}

export const userFields: FormFields<User> = [
  { name: 'email', required: true, blockEdit: true },
  { name: 'username', required: true },
  { name: 'confirmed', type: 'boolean', blockEdit: true },
  { name: 'blocked', type: 'boolean' },
  { name: 'provider', blockEdit: true },
  {
    name: 'role',
    type: 'select',
    endpoint: 'users-permissions/roles',
  },
]
