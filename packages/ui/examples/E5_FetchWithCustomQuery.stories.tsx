import { Meta, StoryObj } from '@storybook/react'

import { FetchWithCustomQuery } from './E5_FetchWithCustomQuery'
import { Container } from '../components/Container'

export default {
  component: FetchWithCustomQuery,
  title: 'Examples/UseQueryWithAxios',
  decorators: [Story => <Container maxW="container.sm">{Story()}</Container>],
} as Meta<typeof FetchWithCustomQuery>

type Story = StoryObj<typeof FetchWithCustomQuery>

export const Default: Story = {}
