import { Meta, StoryObj } from '@storybook/react'
import { sample } from 'lodash'

import { ART_MOCKS } from '@wsvvrijheid/mocks'
import { Art } from '@wsvvrijheid/types'

import { ArtTemplate } from './ArtTemplate'

const sampleArt = sample(ART_MOCKS.data) as Art

export default {
  component: ArtTemplate,
  title: 'Templates/ArtTemplate',
  parameters: {
    nextRouter: {
      path: `club/art/:slug`,
      asPath: `club/art/${sampleArt.slug}`,
      query: {
        slug: sampleArt.slug,
      },
    },
  },
} as Meta

type Story = StoryObj

export const Default: Story = {}
