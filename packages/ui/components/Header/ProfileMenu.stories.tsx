import { StoryObj, Meta } from '@storybook/react'

import { ProfileMenu } from './ProfileMenu'
import { ProfileMenuProps } from './types'

export default {
  component: ProfileMenu,
  title: 'Layout/ProfileMenu',
} as Meta<ProfileMenuProps>

type Story = StoryObj<ProfileMenuProps>

export const Default: Story = {}
