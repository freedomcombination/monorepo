import { Meta, StoryObj } from '@storybook/react'

import { COLLECTION_MOCKS } from '@fc/mocks'

import { CollectionTemplate, CollectionTemplateProps } from './index'

export default {
  component: CollectionTemplate,
  title: 'Templates/CollectionTemplate',
  isLoading: false,
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
