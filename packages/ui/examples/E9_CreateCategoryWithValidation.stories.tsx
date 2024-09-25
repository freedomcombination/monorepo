import { Meta, StoryObj } from '@storybook/react'

import { CreateCategoryWithValidation } from './E9_CreateCategoryWithValidation'
import { Container } from '../components/Container'

export default {
  component: CreateCategoryWithValidation,
  title: 'Examples/CreateCategoryWithValidation',
  decorators: [Story => <Container maxW="container.sm">{Story()}</Container>],
} as Meta<typeof CreateCategoryWithValidation>

type Story = StoryObj<typeof CreateCategoryWithValidation>

export const Default: Story = {}
