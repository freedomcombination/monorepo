import { Meta, StoryObj } from '@storybook/react'

import { AdminLoginForm } from './AdminLoginForm'

export default {
  component: AdminLoginForm,
  title: 'Admin/AdminLoginForm',
} as Meta<typeof AdminLoginForm>

type Story = StoryObj<typeof AdminLoginForm>

export const Default: Story = {}
