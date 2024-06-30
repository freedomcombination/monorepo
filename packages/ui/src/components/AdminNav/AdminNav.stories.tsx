import { Box, Grid } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'
import { sample } from 'lodash'

import { USER_MOCKS } from '@fc/mocks'
import { User } from '@fc/types'
import { mapSessionUser } from '@fc/utils'

import { AdminNav } from './AdminNav'

const sessionUser = mapSessionUser(sample(USER_MOCKS) as User)

export default {
  title: 'Admin/AdminNav',
  component: AdminNav,
  args: {
    user: sessionUser,
  },
  decorators: [
    (Story: any) => (
      <Grid gridTemplateColumns="300px 1fr" bg="gray.100">
        <Box bg="white">
          <Story />
        </Box>
      </Grid>
    ),
  ],
} as Meta<typeof AdminNav>

type Story = StoryObj<typeof AdminNav>

export const Default: Story = {}
