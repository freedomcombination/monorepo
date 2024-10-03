import { Role } from '@fc/types'

import { faker } from './faker'

export type RoleType =
  | 'admin'
  | 'authenticated'
  | 'academyeditor'
  | 'author'
  | 'contentmanager'
  | 'translator'

export const generateRole = (type: RoleType = 'authenticated'): Role => ({
  id: faker.en.number.int(),
  type,
  name: faker.en.person.jobTitle(),
  description: faker.en.name.jobDescriptor(),
  createdAt: faker.en.date.recent().toISOString(),
  updatedAt: faker.en.date.recent().toISOString(),
  nb_users: faker.en.number.int(),
  permissions: {},
})
