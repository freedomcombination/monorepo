import { StoryObj, Meta } from '@storybook/react'

import { HeaderNav } from './HeaderNav'
import { HEADER_MENU } from './mocks'
import { HeaderNavProps } from './types'

export default {
  component: HeaderNav,
  title: 'Layout/HeaderNav',
} as Meta<HeaderNavProps>

type Story = StoryObj<HeaderNavProps>

export const Default: Story = {
  args: {
    menu: HEADER_MENU,
  },
}
