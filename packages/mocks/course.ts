import type { Course } from '@fc/types'

import { generateCommonFields, generateStrapiResponse } from './common'
import { faker } from './faker'

export const generateCourse = (): Course => {
  const { id, createdAt, date, updatedAt, publishedAt, approvalStatus } =
    generateCommonFields('en')

  const title_en = faker.en.lorem.sentence({ min: 1, max: 3 })
  const title_nl = faker.nl.lorem.sentence({ min: 1, max: 3 })
  const title_tr = faker.tr.lorem.sentence({ min: 1, max: 3 })
  const slug = faker.en.helpers.slugify(title_en)

  return {
    id,
    createdAt,
    updatedAt,
    publishedAt,
    translates: [],
    slug,
    title_en,
    title_nl,
    title_tr,
    description_en: faker.nl.lorem.paragraph(),
    description_nl: faker.nl.lorem.paragraph(),
    description_tr: faker.tr.lorem.paragraph(),
    content_en: faker.en.lorem.paragraphs({ min: 3, max: 10 }),
    content_nl: faker.nl.lorem.paragraphs({ min: 3, max: 10 }),
    content_tr: faker.tr.lorem.paragraphs({ min: 3, max: 10 }),
    approvalStatus,
    endDate: date,
    isOnline: faker.en.datatype.boolean(),
    language: 'tr',
    curriculum: [
      {
        id: faker.en.number.int(),
        date: faker.en.date.soon().toISOString(),
        description_en: faker.en.lorem.paragraph(),
        description_nl: faker.nl.lorem.paragraph(),
        description_tr: faker.tr.lorem.paragraph(),
        title_en: faker.en.lorem.sentence(),
        title_nl: faker.nl.lorem.sentence(),
        title_tr: faker.tr.lorem.sentence(),
        instructor: faker.en.person.fullName(),
      },
    ],
    lastRegisterDate: faker.en.date.soon().toISOString(),
    price: faker.en.number.float({ min: 20, max: 100 }),
    startDate: faker.en.date.soon().toISOString(),
    quota: faker.en.number.int({ min: 10, max: 100 }),
    location: faker.en.location.city(),
    instructor: faker.en.person.fullName(),
  }
}

export const COURSE_MOCKS = generateStrapiResponse<Course>(generateCourse)
