import { Meta, StoryObj } from '@storybook/react'
import { sample } from 'lodash'

import { ART_MOCKS } from '@fc/mocks'
import { Art } from '@fc/types'
import { getMediaUrl } from '@fc/utils'

import { ArtContent } from './ArtContent'

const art = sample(ART_MOCKS.data) as Art

export default {
  component: ArtContent,
  title: 'Shared/ArtContent',
  args: {
    art,
  },
} as Meta<typeof ArtContent>

type Story = StoryObj<typeof ArtContent>

export const Default: Story = {
  args: {
    title: art.title_en,
    description: art.description_en,
    artistName: art.artist?.name || art.artist?.email || 'Unknown',
    artistAvatar: getMediaUrl(art.artist?.avatar),
    artistProfilePath: `/artist/${art.artist?.id}`,
  },
}
