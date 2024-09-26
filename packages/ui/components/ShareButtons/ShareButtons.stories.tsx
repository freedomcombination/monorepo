import { StoryObj, Meta } from '@storybook/react'

import { ShareButtons } from './ShareButtons'

export default {
  component: ShareButtons,
  title: 'Shared/ShareButtons',
} as Meta<typeof ShareButtons>

type Story = StoryObj<typeof ShareButtons>

export const Default: Story = {
  args: {
    url: 'https://freedom-combination.vercel.app/tr/club/arts/yalnizlik',
    title: 'Yalnizlik',
    quote:
      'Karısı ölen bir koca yalnız, annesi ölen bir çocuk yalnız, sevdiklerimiz gidiyor kalıyoruz yalnız.',
  },
}
