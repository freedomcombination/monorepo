import { Box } from '@chakra-ui/react'
import { StoryObj, Meta } from '@storybook/react'
import { sample } from 'lodash'

import { USER_MOCKS } from '@fc/mocks'
import { mapSessionUser } from '@fc/utils'

import { AdminLayout } from './AdminLayout'
import { AdminLayoutProps } from './types'

const sessionUser = mapSessionUser(sample(USER_MOCKS)!)

export default {
  title: 'Admin/AdminLayout',
  component: AdminLayout,
  args: {
    user: sessionUser,
    title: 'Admin',
  },
  decorators: [
    Story => (
      <Box m={0} p={0} pos="absolute" top={0} left={0} w="full" h="full">
        <Story />
      </Box>
    ),
  ],
} as Meta<AdminLayoutProps>

type Story = StoryObj<AdminLayoutProps>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    loading: true,
  },
}
