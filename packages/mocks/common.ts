import { type Faker } from '@faker-js/faker'
import { faker as fakerEn } from '@faker-js/faker/locale/en'
import { faker as fakerNl } from '@faker-js/faker/locale/nl'
import { faker as fakerTr } from '@faker-js/faker/locale/tr'
import { BlocksContent } from '@strapi/blocks-react-renderer'

import { StrapiModelKeys } from '@fc/types'
import { Localize, StrapiLocale } from '@fc/types'

const faker: Localize<Faker> = {
  en: fakerEn,
  nl: fakerNl,
  tr: fakerTr,
}

export const generateNodeMock = (locale: StrapiLocale): BlocksContent => [
  {
    type: 'heading',
    level: 1,
    children: [{ type: 'text', text: faker[locale].lorem.sentence() }],
  },
  ...(Array.from({ length: 3 }, () => ({
    type: 'paragraph',
    children: [{ type: 'text', text: faker[locale].lorem.paragraph() }],
  })) as BlocksContent),
]

export const generateFieldMock = (
  locale: StrapiLocale,
  key: StrapiModelKeys,
) => {
  switch (key) {
    case 'id':
      return faker[locale].number.int()
    case 'BIC':
      return faker[locale].finance.bic()
    case 'IBAN1':
      return faker[locale].finance.iban()
    case 'IBAN2':
      return faker[locale].finance.iban()
    case 'KVK':
      return faker[locale].finance.accountNumber()
    case 'RSIN':
      return faker[locale].finance.accountNumber()
    case 'about_en':
    case 'about_nl':
    case 'about_tr':
      return generateNodeMock(locale)
    case 'address':
      return faker[locale].address.streetAddress()
    case 'city':
      return faker[locale].address.city()
    case 'createdAt':
    case 'updatedAt':
    case 'publishedAt':
      return faker[locale].date.recent().toISOString()
    case 'description_en':
    case 'description_nl':
    case 'description_tr':
      return faker[locale].lorem.paragraph({ min: 1, max: 3 })

    default:
      return null
  }
}
