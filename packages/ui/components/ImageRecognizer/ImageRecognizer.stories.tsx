import { useState } from 'react'

import { Meta, StoryObj, StoryFn } from '@storybook/react'

import { ImageRecognizer } from './ImageRecognizer'
import { RecognizedImage } from './types'

export default {
  title: 'Admin/ImageRecognizer',
  component: ImageRecognizer,
} as Meta<typeof ImageRecognizer>

type Story = StoryObj<typeof ImageRecognizer>

const StoryWithState: StoryFn<typeof ImageRecognizer> = () => {
  const [state, setState] = useState<Record<number, RecognizedImage>>({})

  return <ImageRecognizer state={state} setState={setState} />
}

export const Default: Story = {
  render: StoryWithState,
}
