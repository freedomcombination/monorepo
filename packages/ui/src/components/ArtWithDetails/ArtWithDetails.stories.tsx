import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { ART_MOCKS } from '@fc/mocks'

import { ArtWithDetails } from './ArtWithDetails'

export default {
  component: ArtWithDetails,
  title: 'Shared/ArtWithDetails',
} as Meta

type Story = StoryObj

const StoryWithHook: StoryFn = () => {
  return <ArtWithDetails art={ART_MOCKS.data[0]} />
}

export const Default: Story = {
  render: StoryWithHook,
}
