import { StoryObj, Meta } from '@storybook/react'

import { HeaderNavItem } from './HeaderNavItem'
import { HeaderNavItemProps } from './types'

export default {
  component: HeaderNavItem,
  title: 'Layout/HeaderNavItem',
} as Meta<HeaderNavItemProps>

type Story = StoryObj<HeaderNavItemProps>

export const Default: Story = {
  args: {
    item: {
      link: '/events',
      en: 'Events',
      nl: 'Evenementen',
      tr: 'Etkinlikler',
    },
  },
}

export const Parent: Story = {
  args: {
    item: {
      en: 'Events',
      nl: 'Evenementen',
      tr: 'Etkinlikler',

      children: [
        { link: '/events', en: 'Events', nl: 'Evenementen', tr: 'Etkinlikler' },
      ],
    },
  },
}
