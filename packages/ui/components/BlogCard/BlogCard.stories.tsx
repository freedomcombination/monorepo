import { StoryObj, Meta } from '@storybook/react'

import { BLOG_MOCKS } from '@fc/mocks/blog'

import { BlogCard } from './BlogCard'
import { BlogCardProps } from './types'
import { Container } from '../Container'

export default {
  component: BlogCard,
  title: 'Shared/BlogCard',
  args: {
    post: BLOG_MOCKS.tr.data[0],
  },
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as Meta<BlogCardProps>

type Story = StoryObj<BlogCardProps>

export const Default: Story = {}
export const Featured = {
  args: {
    isFeatured: true,
  },
}
