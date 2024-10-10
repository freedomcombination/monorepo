import { Meta, StoryObj } from '@storybook/react'

import { PostMakerTweetCard } from './PostMakerTweetCard'

export default {
  title: 'Admin/PostMakerTweetCard',
  component: PostMakerTweetCard,
} as Meta<typeof PostMakerTweetCard>

type Story = StoryObj<typeof PostMakerTweetCard>

export const Default: Story = {}
export const Ios: Story = {
  args: {
    isIosSafari: true,
  },
}
