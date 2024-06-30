import { StoryObj, Meta, StoryFn } from '@storybook/react'

import { BLOG_MOCKS } from '@fc/mocks'

import { BlogTemplate, BlogTemplateProps } from './BlogTemplate'

export default {
  component: BlogTemplate,
  title: 'Templates/BlogTemplate',
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<BlogTemplateProps>

type Story = StoryObj<BlogTemplateProps>

const Template: StoryFn<BlogTemplateProps> = args => {
  const blogSeo = {
    en: {
      title: 'Blog',
      description: 'Posts',
    },
    nl: {
      title: 'Blog',
      description: 'Posts',
    },
    tr: {
      title: 'Blog',
      description: 'Yazılar',
    },
  }

  const blogs = BLOG_MOCKS.tr?.data || []
  const seo = blogSeo.tr

  return <BlogTemplate seo={args.seo || seo} blogs={args.blogs || blogs} />
}

export const Default: Story = {
  render: Template,
}
