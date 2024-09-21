import { useState, useEffect } from 'react'

import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { ACTIVITY_MOCKS } from '@fc/mocks/activity'

import { ActivityDetail } from './ActivityDetail'
import { ActivityDetailProps } from './types'
import { Container } from '../Container'
export default {
  component: ActivityDetail,
  title: 'Shared/ActivityDetail',
  args: {
    activity: ACTIVITY_MOCKS.tr.data[0],
    title: ACTIVITY_MOCKS.tr.data[0].title,
    image: ACTIVITY_MOCKS.tr.data[0].image,
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
} as Meta<ActivityDetailProps>

type Story = StoryObj<ActivityDetailProps>

const StoryWithHook: StoryFn<ActivityDetailProps> = args => {
  const [source, setSource] = useState<MDXRemoteSerializeResult>()

  const getSource = async (content: string) => {
    const s = await serialize(content || '')
    setSource(s)
  }

  useEffect(() => {
    getSource(args?.activity?.content || '')
  }, [args.activity?.content])

  return <ActivityDetail {...args} source={source!} />
}

export const Default: Story = {
  render: StoryWithHook,
}
