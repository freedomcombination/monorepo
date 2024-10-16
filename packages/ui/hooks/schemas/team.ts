import * as yup from 'yup'

import type { FormFields, Team } from '@fc/types'

import { yupMultiSelect, yupSelect } from './common'

export const useTeamSchema = () => {
  return yup.object({
    name: yup.string().required(),
    description: yup.string(),
    lead: yupSelect,
    members: yupMultiSelect,
    platforms: yupMultiSelect,
  })
}

export const teamFields: FormFields<Team & { team: Team }> = [
  { name: 'name', isRequired: true },
  { name: 'description' },
  { name: 'lead', type: 'select', endpoint: 'profiles', isRequired: true },
  { name: 'members', type: 'select', isMulti: true, endpoint: 'profiles' },
  { name: 'platforms', type: 'select', isMulti: true, endpoint: 'platforms' },
  { name: 'foundation', type: 'select', endpoint: 'foundations' },
]
