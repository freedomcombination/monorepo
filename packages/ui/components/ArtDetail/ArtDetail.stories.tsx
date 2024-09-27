import { Meta, StoryObj } from '@storybook/react'

import { ART_MOCKS } from '@fc/mocks/art'

import { ArtDetail } from './ArtDetail'

export default {
  component: ArtDetail,
  title: 'Shared/ArtDetail',
  args: {
    art: ART_MOCKS.data[0],
  },
} as Meta<typeof ArtDetail>

type Story = StoryObj<typeof ArtDetail>

export const Default: Story = {}
