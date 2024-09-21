import { Meta, StoryObj } from '@storybook/react'

import { FetchWithStrapiRequest } from './E2_FetchWithStrapiRequest'
import { Container } from '../components/Container'

export default {
  component: FetchWithStrapiRequest,
  title: 'Examples/FetchWithStrapiRequest',
  decorators: [Story => <Container maxW="container.sm">{Story()}</Container>],
} as Meta<typeof FetchWithStrapiRequest>

type Story = StoryObj<typeof FetchWithStrapiRequest>

export const Default: Story = {}
