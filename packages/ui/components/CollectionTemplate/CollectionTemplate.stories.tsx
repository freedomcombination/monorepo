import { Meta, StoryObj } from '@storybook/react'

import { COLLECTION_MOCKS } from '@fc/mocks/collection'

import { CollectionTemplate } from './CollectionTemplate'
import { CollectionTemplateProps } from './types'

export default {
  component: CollectionTemplate,
  title: 'Templates/CollectionTemplate',
  loading: false,
  height: 60,
  width: 80,
  pageShow: 10,
  collection: COLLECTION_MOCKS.en.data,
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<CollectionTemplateProps>

type Story = StoryObj<CollectionTemplateProps>

export const Default: Story = {}
