import { StoryObj, Meta } from '@storybook/react'

import { HeaderMobile } from './HeaderMobile'
import { HEADER_MENU } from './mocks'
import { HeaderMobileProps } from './types'

export default {
  component: HeaderMobile,
  title: 'Layout/HeaderMobile',
} as Meta<HeaderMobileProps>

type Story = StoryObj<HeaderMobileProps>

export const Default: Story = {
  args: {
    headerMenu: HEADER_MENU,
  },
}

export const IsLoggedIn: Story = {
  args: {
    isLoggedIn: true,
    headerMenu: HEADER_MENU,
  },
}
