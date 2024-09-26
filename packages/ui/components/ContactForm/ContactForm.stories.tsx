import { StoryFn, Meta, StoryObj } from '@storybook/react'

import { ContactForm } from '.'

export default {
  title: 'Forms/ContactForm',
  component: ContactForm,
} as Meta<typeof ContactForm>

type Story = StoryObj

const StoryWithHook: StoryFn = () => {
  return <ContactForm />
}

export const Default: Story = {
  render: StoryWithHook,
}

export const ErrorMessage: Story = {
  render: StoryWithHook,
  args: {
    errorMessage: 'There is a error',
  },
}
