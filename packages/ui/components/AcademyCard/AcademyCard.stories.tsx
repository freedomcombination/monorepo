import { SimpleGrid } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'

import { AcademyCard } from './AcademyCard'
import { Container } from '../Container'

export default {
  component: AcademyCard,
  title: 'Shared/AcademyCard',
  decorators: [
    Story => (
      <Container maxW="container.lg">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
          <Story />
          <Story />
          <Story />
        </SimpleGrid>
      </Container>
    ),
  ],
} as Meta<typeof AcademyCard>

type Story = StoryObj<typeof AcademyCard>

export const Default: Story = {
  args: {
    title: 'Projects',
    image: 'https://placehold.co/256x',
    href: '/',
  },
}
export const withDescription: Story = {
  args: {
    title: 'Projects',
    image: 'https://placehold.co/256x',
    href: '/',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo nulla expedita sunt magnam sequi.',
  },
}
