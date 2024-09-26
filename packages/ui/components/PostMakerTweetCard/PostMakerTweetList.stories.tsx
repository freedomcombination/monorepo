import { Meta, StoryObj } from '@storybook/react'

import { PostMakerTweetList } from './PostMakerTweetList'
export default {
  title: 'Admin/PostMakerTweetList',
  component: PostMakerTweetList,
} as Meta<typeof PostMakerTweetList>

type Story = StoryObj<typeof PostMakerTweetList>

export const Default: Story = {}
