import { StoryObj, Meta } from '@storybook/react'

import { Header } from './Header'
import { HEADER_MENU } from './mocks'
import { HeaderProps } from './types'

export default {
  component: Header,
  title: 'Layout/Header',
  args: {
    headerMenu: HEADER_MENU,
    logo: 'https://freedomcombination.com/images/logo.svg',
  },
} as Meta<HeaderProps>

type Story = StoryObj<HeaderProps>

export const Default: Story = {}

export const IsLoggedIn: Story = {
  args: {
    isLoggedIn: true,
  },
}
