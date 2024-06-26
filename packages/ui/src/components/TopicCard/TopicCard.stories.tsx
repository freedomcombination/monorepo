import { StoryObj, Meta } from '@storybook/react'

import { TopicCard } from './TopicCard'
import { TopicCardProps } from './types'
import { Container } from '..'
import { TOPICS_MOCK } from '../../mocks'

export default {
  title: 'Admin/TopicCard',
  component: TopicCard,
  args: {
    topic: TOPICS_MOCK.data.data[0],
  },
  decorators: [
    Story => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as Meta<TopicCardProps>

type Story = StoryObj<TopicCardProps>

export const Default: Story = {}
