import { useDisclosure } from '@chakra-ui/hooks'
import { Box, Container } from '@chakra-ui/react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { sample } from 'lodash'

import { ACTIVITY_MOCKS, BLOG_MOCKS, HASHTAG_MOCKS } from '@fc/mocks'

import { TranslateModal } from './TranslateModal'
import { Button } from '../Button'

export default {
  component: TranslateModal,
  title: 'Admin/TranslateModal',
  decorators: [
    Story => (
      <Container maxW="container.xl">
        <Story />
      </Container>
    ),
  ],
} as Meta<typeof TranslateModal>

type Story = StoryObj<typeof TranslateModal>

const StoryWithHooks: StoryFn<typeof TranslateModal> = args => {
  const { open, onOpen, onClose } = useDisclosure()

  const handleSizeClick = () => {
    onOpen()
  }

  return (
    <Box>
      <Button onClick={() => handleSizeClick()} m={4}>
        {`Open Modal`}
      </Button>

      <TranslateModal {...args} isOpen={open} onClose={onClose} />
    </Box>
  )
}

export const ActivityModel: Story = {
  render: StoryWithHooks,
  args: {
    model: sample(ACTIVITY_MOCKS.tr.data),
  },
}

export const BlogModel: Story = {
  render: StoryWithHooks,
  args: {
    model: sample(BLOG_MOCKS.tr.data),
  },
}

export const HashtagModel: Story = {
  render: StoryWithHooks,
  args: {
    model: sample(HASHTAG_MOCKS.tr.data),
  },
}
