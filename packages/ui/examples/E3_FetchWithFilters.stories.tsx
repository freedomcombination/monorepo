import { Meta, StoryObj } from '@storybook/react'

import { FetchWithFilters } from './E3_FetchWithFilters'
import { Container } from '../components/Container'

export default {
  component: FetchWithFilters,
  title: 'Examples/FetchWithFilters',
  decorators: [Story => <Container maxW="container.sm">{Story()}</Container>],
} as Meta<typeof FetchWithFilters>

type Story = StoryObj<typeof FetchWithFilters>

export const Default: Story = {}
