import { Stack } from '@chakra-ui/react'
import { Meta, StoryObj, StoryFn } from '@storybook/react'

import { TWEET_MOCKS } from '@fc/mocks/tweet'

import { TweetCard } from './TweetCard'
import { Container } from '../Container'

export default {
  component: TweetCard,
  title: 'Admin/TweetCard',
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as Meta<typeof TweetCard>

type Story = StoryObj<typeof TweetCard>

const ListTemplate: StoryFn<typeof TweetCard> = () => (
  <Stack>
    {TWEET_MOCKS.map(tweet => (
      <TweetCard key={tweet.id} tweet={tweet} shadow="base" rounded={0} />
    ))}
  </Stack>
)

export const Default: Story = {
  args: {
    tweet: TWEET_MOCKS[2],
  },
}

export const Image: Story = {
  args: {
    tweet: TWEET_MOCKS[1],
  },
}

export const Video: Story = {
  args: {
    tweet: TWEET_MOCKS[0],
  },
}

export const List: Story = {
  render: ListTemplate,
}
