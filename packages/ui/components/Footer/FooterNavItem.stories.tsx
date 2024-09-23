import { Box } from '@chakra-ui/react'
import { StoryObj, Meta } from '@storybook/react'

import { FooterNavItem } from './FooterNavItem'
import { FooterNavItemProps } from './types'

export default {
  component: FooterNavItem,
  title: 'Layout/FooterNavItem',
  decorators: [
    Story => (
      <Box p={4} bg="primary.900">
        <Story />
      </Box>
    ),
  ],
} as Meta<FooterNavItemProps>

type Story = StoryObj<FooterNavItemProps>

export const Default: Story = {
  args: {
    item: {
      link: '/about',
      en: 'About',
      nl: 'Over',
      tr: 'Hakkımızda',
    },
  },
}
