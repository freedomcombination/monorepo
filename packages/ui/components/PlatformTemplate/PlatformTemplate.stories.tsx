import { Meta, StoryObj } from '@storybook/react'

import { PlatformTemplate } from './PlatformTemplate'
import { PlatformTemplateProps } from './types'

export default {
  component: PlatformTemplate,
  title: 'Templates/PlatformTemplate',
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<PlatformTemplateProps>

type Story = StoryObj<PlatformTemplateProps>

export const Default: Story = {
  args: {
    seo: {
      title: 'Trend Rights',
    },
    image: '/images/trend-rights-logo.svg',
    link: '/platforms/trend-rights',
  },
}
