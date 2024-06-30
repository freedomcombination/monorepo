import { Meta, StoryObj } from '@storybook/react'

import { TWEET_MOCKS } from '@fc/mocks'

import { TweetWidget } from './TweetWidget'

export default {
  title: 'PostMaker/TweetWidget',
  component: TweetWidget,
} as Meta<typeof TweetWidget>

type Story = StoryObj<typeof TweetWidget>

export const Default: Story = {
  args: {
    title: 'TweetWidget',
    tweets: TWEET_MOCKS,
  },
}

export const Empty: Story = {
  args: {
    title: 'TweetWidget',
    tweets: null,
  },
}
