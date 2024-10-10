import { Box, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'

import { getFiles } from '@fc/mocks/file'
import { IMAGE_MOCK } from '@fc/mocks/image'

import { WImageProps } from './types'
import { WImage } from './WImage'
import { Container } from '../Container'

export default {
  component: WImage,
  title: 'Shared/WImage',
  decorators: [
    Story => (
      <Container maxW="container.md">
        <Story />
      </Container>
    ),
  ],
  args: {
    src: IMAGE_MOCK,
  },
  argTypes: {
    format: {
      control: {
        type: 'select',
        options: ['thumbnail', 'small', 'medium', 'large'],
      },
    },
  },
} as Meta<WImageProps>

type Story = StoryObj<WImageProps>

export const Default: Story = {}

export const Zoom: Story = {
  args: {
    hasZoom: true,
  },
}

export const Local: Story = {
  args: {
    src: '/images/no-blog.svg',
  },
}

export const External: Story = {
  args: {
    src: 'https://picsum.photos/200/300',
  },
}

export const Width300: Story = {
  args: {
    w: 300,
  },
}

export const Height300: Story = {
  args: {
    h: 300,
  },
}

export const BoxSize250 = {
  args: {
    boxSize: 250,
  },
}

export const Twitter = {
  args: {
    ratio: 'twitter',
  },
}

export const Rounded = {
  args: {
    rounded: true,
  },
}

// CUSTOM
export const Card = () => (
  <Box p={2} bg="primary.400">
    <WImage src={IMAGE_MOCK} alt="box" ratio={3} />
    <Text>Card content</Text>
  </Box>
)

export const FlexCard = () => (
  <Flex>
    <WImage src={IMAGE_MOCK} alt="flex" />
    <Text>Card content</Text>
  </Flex>
)

export const Float = () => (
  <Box>
    <WImage
      src={IMAGE_MOCK}
      alt="float"
      float="left"
      boxSize="48"
      mr={4}
      rounded="full"
    />
    <Text>
      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
      praesentium voluptatum deleniti atque corrupti quos dolores et quas
      molestias excepturi sint occaecati cupiditate non provident, similique
      sunt in culpa qui officia deserunt mollitia animi, id est laborum et
      dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
      Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
      impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
      assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
      officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
      repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
      tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
      consequatur aut perferendis doloribus asperiores repellat.
    </Text>
  </Box>
)

export const GridZoom = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={4} h="full">
      {getFiles()
        .filter(file => file.mime.includes('image'))
        .map(file => (
          <VStack key={file.id} shadow="base">
            <WImage src={file} hasZoom={true} alt={''} />
            <Text p={2} noOfLines={1}>
              {file.name}
            </Text>
          </VStack>
        ))}
    </SimpleGrid>
  )
}
