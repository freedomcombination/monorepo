import { StoryObj, Meta } from '@storybook/react'

import { CommentItem } from './CommentItem'

export default {
  component: CommentItem,
  title: 'Shared/CommentItem',
  args: {
    comment: {},
  },
} as Meta<typeof CommentItem>

type Story = StoryObj<typeof CommentItem>

export const Default: Story = {}
