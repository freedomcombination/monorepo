import { Meta, StoryObj } from '@storybook/react'

import { AdminNavItem } from './AdminNavItem'
import { Container } from '../../components'

export default {
  title: 'Admin/AdminNavItem',
  component: AdminNavItem,
  args: {
    label: 'Test',
    link: '/',
    visible: true,
    submenu: [
      {
        label: 'Test',
        link: '/',
        icon: <></>,
        visible: true,
        submenu: [],
      },
    ],
  },
  decorators: [
    (Story: any) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as Meta<typeof AdminNavItem>

type Story = StoryObj<typeof AdminNavItem>

export const Default: Story = {}
