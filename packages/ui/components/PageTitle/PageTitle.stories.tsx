import { StoryObj, Meta } from '@storybook/react'

import { PageTitle } from './PageTitle'

export default {
  component: PageTitle,
  title: 'Shared/PageTitle',
} as Meta<typeof PageTitle>

type Story = StoryObj<typeof PageTitle>

export const Default: Story = {
  args: {
    children: 'Page Title',
  },
}
