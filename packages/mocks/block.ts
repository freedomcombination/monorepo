import { BlocksContent } from '@strapi/blocks-react-renderer'

import { StrapiLocale } from '@fc/types'

import { faker } from './faker'

export const generateBlocksContent = (locale: StrapiLocale): BlocksContent => [
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
