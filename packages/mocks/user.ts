import type { User } from '@fc/types'

import { faker } from './faker'
import { generateRole, RoleType } from './role'

export const generateUser = (role: RoleType): User => ({
  id: faker.en.number.int(),
  username: faker.en.internet.userName(),
  email: faker.en.internet.email(),
  blocked: false,
  confirmed: true,
  createdAt: faker.en.date.recent().toISOString(),
  provider: 'local',
  updatedAt: faker.en.date.recent().toISOString(),
  translates: [],
  role: generateRole(role),
})

export const USER_MOCKS: Array<User> = Array.from({ length: 8 }, () =>
  generateUser('authenticated'),
)
