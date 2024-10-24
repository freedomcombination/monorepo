import { Faker } from '@faker-js/faker'
import { faker as fakerEn } from '@faker-js/faker/locale/en'
import { faker as fakerNl } from '@faker-js/faker/locale/nl'
import { faker as fakerTr } from '@faker-js/faker/locale/tr'

import { Localize } from '@fc/types'

export const faker: Localize<Faker> = {
  en: fakerEn,
  nl: fakerNl,
  tr: fakerTr,
}
