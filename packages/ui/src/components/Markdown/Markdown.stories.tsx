import { Meta, StoryObj } from '@storybook/react'

import { SOURCE_MOCK } from '@fc/mocks'

import { Markdown } from './Markdown'
import { MarkdownProps } from './types'

export default {
  component: Markdown,
  title: 'Shared/Markdown',
} as Meta<MarkdownProps>

type Story = StoryObj<MarkdownProps>

export const Default: Story = {
  args: {
    source: SOURCE_MOCK,
  },
}
