import { Meta, StoryObj } from '@storybook/react'

import { MentionList } from './MentionList'

export default {
  title: 'PostMaker/MentionList',
  component: MentionList,
} as Meta<typeof MentionList>

type Story = StoryObj<typeof MentionList>

export const Default: Story = {}
