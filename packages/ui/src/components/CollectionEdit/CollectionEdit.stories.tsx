import { Container } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'

import { COLLECTION_MOCKS } from '@fc/mocks'

import { CollectionEdit } from './CollectionEdit'

export default {
  component: CollectionEdit,
  title: 'Admin/CollectionEdit',
  decorators: [
    Story => (
      <Container maxW="container.xl">
        <Story />
      </Container>
    ),
  ],
} as Meta<typeof CollectionEdit>

type Story = StoryObj<typeof CollectionEdit>

export const Default: Story = {
  args: {
    collection: COLLECTION_MOCKS.tr.data[0],
  },
}
