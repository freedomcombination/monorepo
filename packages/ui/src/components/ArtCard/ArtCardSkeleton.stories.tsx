import { StoryObj, Meta } from '@storybook/react'

import { ArtCard } from './ArtCard'
import { ArtCardSkeleton } from './ArtCardSkeleton'
import { Container } from '../Container'

export default {
  component: ArtCardSkeleton,
  title: 'Shared/ArtCardSkeleton',
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as Meta<typeof ArtCard>

type Story = StoryObj<typeof ArtCard>

export const Default: Story = {}

export const Masonry: Story = {
  args: {
    isMasonry: true,
  },
}
