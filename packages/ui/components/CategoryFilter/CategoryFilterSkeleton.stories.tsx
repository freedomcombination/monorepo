import { Box, Grid } from '@chakra-ui/react'
import { StoryFn, Meta, StoryObj } from '@storybook/react'

import { CategoryFilterSkeleton } from './CategoryFilterSkeleton'
import { Container } from '../Container'

export default {
  component: CategoryFilterSkeleton,
  title: 'Shared/CategoryFilterSkeleton',
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as Meta<typeof CategoryFilterSkeleton>

type Story = StoryObj<typeof CategoryFilterSkeleton>

const Template: StoryFn<typeof CategoryFilterSkeleton> = () => {
  return (
    <Grid gridTemplateColumns="300px 1fr">
      <Box bg="gray.100" p={4}>
        <CategoryFilterSkeleton />
      </Box>
    </Grid>
  )
}

export const Default: Story = {
  render: Template,
}
