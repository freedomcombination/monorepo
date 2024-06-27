import { StoryObj, Meta } from '@storybook/react'

import { SocialButtons } from './SocialButtons'
import { SocialButtonsProps } from './types'
import { SOCIAL_LINKS } from '../../mocks'

export default {
  component: SocialButtons,
  title: 'Shared/SocialButtons',
  args: {
    items: SOCIAL_LINKS,
  },
} as Meta<SocialButtonsProps>

type Story = StoryObj<SocialButtonsProps>

export const Default: Story = {}
