import { Meta, StoryObj } from '@storybook/react'

import { MENTION_MOCKS } from '@fc/mocks'

import MentionListItem from './MentionListItem'

export default {
  title: 'PostMaker/MentionListItem',
  component: MentionListItem,
} as Meta<typeof MentionListItem>

type Story = StoryObj<typeof MentionListItem>

export const Default: Story = {
  args: {
    data: MENTION_MOCKS.data[0] as any,
    onAddItem: alert,
    onRemoveItem: alert,
  },
}
