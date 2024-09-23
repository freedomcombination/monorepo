import { Meta, StoryObj } from '@storybook/react'

import type { OgImageParams } from '@fc/types'

import { Caps } from './Caps'
import { CapsProps } from './types'

export default {
  title: 'Shared/Caps',
  component: Caps,
} as Meta<CapsProps>

type Story = StoryObj<CapsProps>

const imageParams: OgImageParams = {
  title: 'Example Title',
  text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum nemo sunt, eaque, voluptas laborum ut, doloribus fuga dolores sit aliquid quisquam beatae. Hic cumque enim autem odio quae perferendis porro.',
  image: 'https://picsum.photos/200/300',
  shape: 0,
  bg: 'white',
  color: 'black',
  flip: true,
  hasLine: true,
  scale: 0.5,
}

export const Default: Story = {
  args: {
    imageParams,
  },
}
