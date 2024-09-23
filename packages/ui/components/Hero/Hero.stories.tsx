import { StoryObj, Meta } from '@storybook/react'

import { Hero } from './Hero'
import { HeroProps } from './types'

export default {
  component: Hero,
  title: 'Layout/Hero',
  args: {
    image:
      'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000',
  },
} as Meta<HeroProps>

type Story = StoryObj<HeroProps>

export const Default: Story = {}

export const FullHeight: Story = {
  args: {
    isFullHeight: true,
  },
}
