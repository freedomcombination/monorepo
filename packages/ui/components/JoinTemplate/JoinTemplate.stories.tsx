import { StoryObj, Meta } from '@storybook/react'

import { JoinTemplate, JoinTemplateProps } from '.'

export default {
  component: JoinTemplate,
  title: 'Templates/JoinTemplate',
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<JoinTemplateProps>

type Story = StoryObj<JoinTemplateProps>

export const Default: Story = {
  args: {
    title: 'Trend Rights',
  },
}
