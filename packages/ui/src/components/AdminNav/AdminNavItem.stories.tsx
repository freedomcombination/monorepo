import { Meta, StoryObj } from '@storybook/react'

import { AdminNavItem } from './AdminNavItem'
import { Container } from '../Container'

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
