import { Box } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'

import { FooterNav } from './FooterNav'
import { FOOTER_MENU } from './mocks'
import { FooterNavProps } from './types'

export default {
  component: FooterNav,
  title: 'Layout/FooterNav',
  decorators: [
    Story => (
      <Box bg="primary.900">
        <Story />
      </Box>
    ),
  ],
} as Meta<FooterNavProps>

type Story = StoryObj<FooterNavProps>

export const Default: Story = {
  args: {
    menu: FOOTER_MENU,
  },
}
