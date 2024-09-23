import { Meta, StoryObj } from '@storybook/react'

import { CreateCategory } from './E6_CreateCategory'
import { Container } from '../components/Container'

export default {
  component: CreateCategory,
  title: 'Examples/CreateCategory',
  decorators: [Story => <Container maxW="container.sm">{Story()}</Container>],
} as Meta<typeof CreateCategory>

type Story = StoryObj<typeof CreateCategory>

export const WithAxios: Story = {}

export const WithMutation: Story = {}
WithMutation.args = {
  fetcher: 'mutation',
}
