// import { Box, SimpleGrid } from '@chakra-ui/react'
import { StoryObj, Meta } from '@storybook/react'

import { TIMELINE_MOCKS } from '@fc/mocks'

import { TimelineBoard } from './TimelineBoard'
import { Container } from '../Container'

export default {
  title: 'Admin/TimelineBoard',
  component: TimelineBoard,
  args: {
    timeline: TIMELINE_MOCKS[0],
  },
  decorators: [
    Story => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as Meta

type Story = StoryObj<typeof TimelineBoard>

export const Default: Story = {}
