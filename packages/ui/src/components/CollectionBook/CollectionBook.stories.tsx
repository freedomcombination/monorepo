import { StoryObj, Meta } from '@storybook/react'

import { COLLECTION_MOCKS } from '@fc/mocks'

import { CollectionBook } from '.'
import { CollectionBookProps } from './types'

export default {
  component: CollectionBook,
  title: 'Templates/CollectionBook',
} as Meta<CollectionBookProps>

type Story = StoryObj<CollectionBookProps>

export const Default: Story = {
  args: {
    collection: COLLECTION_MOCKS.tr.data[0],
    logo: '/images/kunsthalte.png',
  },
}
