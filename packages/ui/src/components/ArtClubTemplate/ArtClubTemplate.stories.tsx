import { Meta, StoryObj } from '@storybook/react'

import { ArtClubTemplate } from './ArtClubTemplate'

export default {
  component: ArtClubTemplate,
  title: 'Templates/ArtClubTemplate',
  parameters: {
    nextRouter: {
      locale: 'en',
      query: {
        page: 1,
      },
    },
  },
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<typeof ArtClubTemplate>

type Story = StoryObj<typeof ArtClubTemplate>

export const Default: Story = {}

export const InitialCategories: Story = {
  parameters: {
    nextjs: {
      router: {
        locale: 'en',
        query: {
          page: 3,
          categories: '0=photo&1=nature',
        },
      },
    },
  },
}
