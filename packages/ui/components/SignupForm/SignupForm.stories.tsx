import { StoryObj, Meta } from '@storybook/react'

import { SignupForm } from '.'

export default {
  title: 'Forms/SignupForm',
  component: SignupForm,
} as Meta<typeof SignupForm>

type Story = StoryObj<typeof SignupForm>

export const Default: Story = {}
