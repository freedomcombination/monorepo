import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { useRouter } from 'next/router'

import { SITE_URL } from '@fc/config'
import { BLOG_MOCKS } from '@fc/mocks'

import BlogDetail from './BlogDetail'
import { BlogDetailProps } from './types'
import { Container } from '../Container'

export default {
  component: BlogDetail,
  title: 'Shared/BlogDetail',
  parameters: {
    nextjs: {
      router: {
        pathname: '/blog/[slug]',
        asPath: '/blog/dimitri-1',
        locale: 'tr',
        query: {
          slug: 'dimitri-1',
        },
      },
    },
  },
  args: {
    post: BLOG_MOCKS.tr.data[1],
    authorBlogs: BLOG_MOCKS.tr.data,
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
} as Meta<BlogDetailProps>

type Story = StoryObj<BlogDetailProps>

const StoryWithHook: StoryFn<BlogDetailProps> = args => {
  const {
    locale,
    query: { slug },
  } = useRouter()

  const link = `${SITE_URL}/${locale}/blog/${slug}`

  return <BlogDetail {...args} link={link} />
}

export const Default: Story = {
  render: StoryWithHook,
}
