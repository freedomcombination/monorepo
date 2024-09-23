import { StoryObj, Meta } from '@storybook/react'

import { SocialLoginButtons } from './SocialLoginButtons'

export default {
  component: SocialLoginButtons,
  title: 'Shared/SocialLoginButtons',
} as Meta<typeof SocialLoginButtons>

type Story = StoryObj<typeof SocialLoginButtons>

export const Default: Story = {}
export const Disabled: Story = {
  args: {
    providersToBeShown: ['twitter'],
  },
}
