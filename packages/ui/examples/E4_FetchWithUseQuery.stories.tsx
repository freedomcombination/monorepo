import { Meta, StoryObj } from '@storybook/react'

import { FetchWithUseQuery } from './E4_FetchWithUseQuery'
import { Container } from '../components/Container'

export default {
  component: FetchWithUseQuery,
  title: 'Examples/FetchWithUseQuery',
  decorators: [Story => <Container maxW="container.sm">{Story()}</Container>],
} as Meta<typeof FetchWithUseQuery>

type Story = StoryObj<typeof FetchWithUseQuery>

export const Default: Story = {}
