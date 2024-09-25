import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { CommentForm } from '.'
import { CommentFormProps } from './types'

export default {
  title: 'Forms/CommentForm',
  component: CommentForm,
} as Meta<typeof CommentForm>

type Story = StoryObj<CommentFormProps>

const StoryWithHook: StoryFn<CommentFormProps> = args => {
  return <CommentForm {...args} artId={1} onSuccess={() => alert('Success!')} />
}

export const Default: Story = {
  render: StoryWithHook,
}
