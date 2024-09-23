import { Meta, StoryObj } from '@storybook/react'

import MarkdownEditor from './MarkdownEditor'

export default {
  component: MarkdownEditor,
  title: 'Shared/MarkdownEditor',
} as Meta<typeof MarkdownEditor>

type Story = StoryObj<typeof MarkdownEditor>

export const Default: Story = {}
