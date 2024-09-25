import { Meta, StoryObj } from '@storybook/react'

import { MentionListSkeleton } from './MentionListSkeleton'

export default {
  title: 'PostMaker/MentionListSkeleton',
  component: MentionListSkeleton,
} as Meta<typeof MentionListSkeleton>

type Story = StoryObj<typeof MentionListSkeleton>

export const Default: Story = {}
