import { StoryObj, Meta } from '@storybook/react'

import { ForgotPasswordForm } from './ForgotPasswordForm'

export default {
  title: 'Forms/ForgotPasswordForm',
  component: ForgotPasswordForm,
} as Meta<typeof ForgotPasswordForm>

type Story = StoryObj<typeof ForgotPasswordForm>

export const Default: Story = {}
