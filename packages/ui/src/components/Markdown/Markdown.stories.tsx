import { Meta, StoryObj } from '@storybook/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { Markdown } from './Markdown'
import { MarkdownProps } from './types'
import { SOURCE_MOCK } from '@fc/mocks'

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
