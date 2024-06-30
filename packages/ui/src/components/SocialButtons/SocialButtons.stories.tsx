import { StoryObj, Meta } from '@storybook/react'

import { SOCIAL_LINKS } from './mocks'
import { SocialButtons } from './SocialButtons'
import { SocialButtonsProps } from './types'

export default {
  component: SocialButtons,
  title: 'Shared/SocialButtons',
  args: {
    items: SOCIAL_LINKS,
  },
} as Meta<SocialButtonsProps>

type Story = StoryObj<SocialButtonsProps>

export const Default: Story = {}
