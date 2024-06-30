import { Meta, StoryObj } from '@storybook/react'

import { LanguageSwitcher } from './LanguageSwitcher'

export default {
  component: LanguageSwitcher,
  title: 'Admin/LanguageSwitcher',
} as Meta<typeof LanguageSwitcher>

type Story = StoryObj<typeof LanguageSwitcher>

export const Default: Story = {}
