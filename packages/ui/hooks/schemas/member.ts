import * as yup from 'yup'

import { FormFields, Team } from '@fc/types'

import { yupSelect } from './common'

export const useMemberSchema = () => {
  return yup.object({
    members: yupSelect,
  })
}
export const memberFields: FormFields<Team> = [
  { name: 'members', type: 'select', isMulti: true, endpoint: 'profiles' },
]
