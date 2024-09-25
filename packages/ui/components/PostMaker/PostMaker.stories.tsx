import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { PostMaker } from './PostMaker'

export default {
  title: 'PostMaker/PostMaker',
  component: PostMaker,
} as Meta<typeof PostMaker>

type Story = StoryObj<typeof PostMaker>

const StoryWithHook: StoryFn<typeof PostMaker> = () => {
  return <PostMaker />
}

export const Default: Story = {
  render: StoryWithHook,
}
