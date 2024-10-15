import { DevMail } from '@fc/types/dev-mail'

import { generateCommonFields, generateStrapiResponse } from './common'
import { faker } from './faker'

let count = 3
let groupDate: string

export const generateDevMails = (): DevMail => {
  const { id, createdAt, updatedAt, publishedAt } = generateCommonFields('en')

  const limit = faker.en.number.int({ min: 1, max: 3 })
  if (++count >= limit) {
    count = 0
    groupDate = faker.en.date.recent().toISOString()
  }

  return {
    id,
    createdAt,
    updatedAt,
    publishedAt,
    subject: faker.en.lorem.sentence(),
    to: faker.en.internet.email(),
    html: faker.en.lorem.paragraphs({ min: 3, max: 10 }),
    groupDate,
  }
}

export const DEV_MAIL = generateStrapiResponse<DevMail>(generateDevMails)

export const DEV_MAIL_GEN = () =>
  generateStrapiResponse<DevMail>(generateDevMails)
