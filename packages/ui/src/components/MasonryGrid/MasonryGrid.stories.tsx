import { Box } from '@chakra-ui/react'
import { StoryFn, Meta, StoryObj } from '@storybook/react'

import { MasonryGrid } from './MasonryGrid'
import { MasonryGridProps } from './types'
import { Container } from '../Container'

export default {
  component: MasonryGrid,
  title: 'Shared/MasonryGrid',
  decorators: [
    Story => (
      <Container maxW="container.lg">
        <Story />
      </Container>
    ),
  ],
} as Meta<MasonryGridProps>

type Story = StoryObj<MasonryGridProps>

const Template: StoryFn<MasonryGridProps> = args => {
  return (
    <MasonryGrid {...args}>
      {Array.from({ length: 20 }, (_, idx) => idx).map(item => {
        const height = Math.floor(Math.random() * 200) + 50

        return <Box key={item} bg="primary.100" h={`${height}px`} />
      })}
    </MasonryGrid>
  )
}

export const Default: Story = {
  render: Template,
}
