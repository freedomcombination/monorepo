import { Meta, StoryObj } from '@storybook/react'
import { sample } from 'lodash'

import { PLATFORM_MOCKS } from '@fc/mocks/platform'
import type { Platform } from '@fc/types'

import { Card } from './Card'
import { Container } from '../Container'

export default {
  component: Card,
  title: 'Shared/Card',
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as Meta<typeof Card>

type Story = StoryObj<typeof Card>

const { name_en, description_en, image } = sample(
  PLATFORM_MOCKS.data,
) as Platform

export const Default: Story = {
  args: {
    title: name_en,
    description: description_en,
    image,
  },
}

export const Rounded: Story = {
  args: {
    title: name_en,
    description: description_en,
    image,
    rounded: true,
  },
}
