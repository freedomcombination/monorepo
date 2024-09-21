import { Meta, StoryObj } from '@storybook/react'

import { CreateCategoryWithHookForm } from './E8_CreateCategoryWithHookForm'
import { Container } from '../components/Container'

export default {
  component: CreateCategoryWithHookForm,
  title: 'Examples/CreateCategoryWithHookForm',
  decorators: [Story => <Container maxW="container.sm">{Story()}</Container>],
} as Meta<typeof CreateCategoryWithHookForm>

type Story = StoryObj<typeof CreateCategoryWithHookForm>

export const Default: Story = {}
