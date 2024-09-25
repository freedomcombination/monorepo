import { Meta, StoryObj } from '@storybook/react'

import { FetcWithAxios } from './E1_FetchWithAxios'
import { Container } from '../components/Container'

export default {
  component: FetcWithAxios,
  title: 'Examples/FetcWithAxios',
  decorators: [Story => <Container maxW="container.sm">{Story()}</Container>],
} as Meta<typeof FetcWithAxios>

type Story = StoryObj<typeof FetcWithAxios>

export const Default: Story = {}
