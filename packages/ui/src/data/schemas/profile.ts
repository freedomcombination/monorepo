import * as yup from 'yup'

import { Profile, Role } from '@fc/types' // Import the StrapiCollectionEndpoint type
import { Observation } from '@fc/types/src/observation'

import { yupMultiSelect, yupSelect } from './common'
import { FormFields } from '../../admin' // Add FormTextFields and FormCommonFields imports

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
    // https://yidaotus.medium.com/using-yup-and-typescript-for-typesafe-select-validation-e9ee9d4bceec
    profileStatus: yupSelect,
    isVolunteer: yup.boolean(),
    user: yupSelect.required(),
    comment: yup.string(),
    observation: yup.array().of(
      yup.object({
        content: yup.string().required(),
      }),
    ),

    platforms: yupMultiSelect,
  })
}

export const profileFields: FormFields<
  Profile & { role: Role } & { observations: Observation[] }
> = [
  { name: 'name', isRequired: true },
  { name: 'email', isRequired: true, blockEdit: true },
  { name: 'phone' },
  { name: 'age' },
  { name: 'availableHours' },
  { name: 'country' },
  { name: 'city' },
  {
    name: 'profileStatus',
    type: 'select',
    options: [
      'accepted',
      'approved',
      'awaiting',
      'in-progress',
      'left',
      'pending',
      'rejected',
    ],
  },
  { name: 'jobs', type: 'select', isMulti: true, endpoint: 'jobs' },
  { name: 'isVolunteer', type: 'boolean' },
  { name: 'user', type: 'select', endpoint: 'users' },
  { name: 'platforms', type: 'select', isMulti: true, endpoint: 'platforms' },
  { name: 'avatar', type: 'file' },
  {
    name: 'observation',
    type: 'relation-array',
    endpoint: 'observations',
  }, // Use the StrapiCollectionEndpoint type annotation
]
