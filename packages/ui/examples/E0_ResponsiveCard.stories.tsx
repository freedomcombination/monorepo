import { Meta, StoryObj } from '@storybook/react'

import { ResponsiveCard } from './E0_ResponsiveCard'
import { Container } from '../components/Container'

export default {
  component: ResponsiveCard,
  title: 'Examples/ResponsiveCard',
  decorators: [Story => <Container maxW="container.sm">{Story()}</Container>],
} as Meta<typeof ResponsiveCard>

type Story = StoryObj<typeof ResponsiveCard>

export const Default: Story = {}
