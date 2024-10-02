import type { AccountStats } from '@fc/types'

import { generateCommonFields, generateStrapiResponse } from './common'
import { faker } from './faker'

export const generateAccountStats = (): AccountStats => {
  const { id, createdAt, updatedAt, publishedAt } = generateCommonFields('en')

  return {
    id,
    createdAt,
    updatedAt,
    publishedAt,
    translates: [],
    date: faker.en.date.recent().toISOString(),
    likes: faker.en.number.int({ min: 200, max: 1000 }),
    followers: faker.en.number.int({ min: 200, max: 1000 }),
    followings: faker.en.number.int({ min: 200, max: 1000 }),
    replies: faker.en.number.int({ min: 200, max: 1000 }),
    retweets: faker.en.number.int({ min: 200, max: 1000 }),
    tweets: faker.en.number.int({ min: 200, max: 1000 }),
    username: faker.en.internet.userName(),
  }
}

export const ACCOUNT_STATS =
  generateStrapiResponse<AccountStats>(generateAccountStats)
