import * as yup from 'yup'

import { Profile, Role } from '@fc/types'

import { yupMultiSelect, yupSelect } from './common'
import { FormFields, FormSelectFields } from '../../admin' // Add FormSelectFields import

export const useProfileSchema = () => {
  return yup.object({
    name: yup.string().required(),
    availableHours: yup.number().min(1),
    email: yup.string().email().required(),
    city: yup.string(),
    country: yup.string(),
    phone: yup.string(),
    age: yup.number().min(0).max(100),
    avatar: yup.mixed(),
    jobs: yupMultiSelect,
    role: yupMultiSelect,
    status: yupSelect,
    isVolunteer: yup.boolean(),
    user: yupSelect.required(),
    comment: yup.string(),
    platforms: yupMultiSelect,
  })
}
enum ProfileStatus {
  Left = 'left',
  Pending = 'pending',
  Accepted = 'accepted',
  Awaiting = 'awaiting',
  Rejected = 'rejected',
  InProgress = 'in-progress',
}
export const profileFields: FormFields<Profile & { role: Role }> = [
  { name: 'name', isRequired: true },
  { name: 'email', isRequired: true, blockEdit: true },
  { name: 'phone' },
  { name: 'age' },
  { name: 'availableHours' },
  { name: 'country' },
  { name: 'city' },
  {
    name: 'status',
  },
  { name: 'jobs', type: 'select', isMulti: true, endpoint: 'jobs' },
  { name: 'isVolunteer', type: 'boolean' },
  { name: 'user', type: 'select', endpoint: 'users' },
  { name: 'platforms', type: 'select', isMulti: true, endpoint: 'platforms' },
  { name: 'avatar', type: 'file' },
  { name: 'comment', type: 'textarea', blockEdit: true },
]
