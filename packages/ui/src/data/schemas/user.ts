import * as yup from 'yup'

import { User } from '@fc/types'

import { yupSelect } from './common'
import { FormFields } from '../../admin'

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
  { name: 'email', isRequired: true, blockEdit: true },
  { name: 'username', isRequired: true },
  { name: 'confirmed', type: 'boolean', blockEdit: true },
  { name: 'blocked', type: 'boolean' },
  { name: 'provider', blockEdit: true },
  {
    name: 'role',
    type: 'select',
    endpoint: 'users-permissions/roles',
  },
]
