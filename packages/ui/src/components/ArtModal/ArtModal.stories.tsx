import { useDisclosure } from '@chakra-ui/hooks'
import { Box } from '@chakra-ui/react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { sample } from 'lodash'

import { ART_MOCKS } from '@fc/mocks'

import { ArtModal } from './ArtModal'
import { ArtModalProps } from './types'
import { Button } from '../Button'

const sampleArt = sample(ART_MOCKS.data)!

export default {
  component: ArtModal,
  title: 'Shared/ArtModal',
} as Meta<ArtModalProps>

type Story = StoryObj<ArtModalProps>

const StoryWithHooks: StoryFn<ArtModalProps> = args => {
  const { open, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <Button onClick={() => onOpen()} m={4}>
        {`Open Modal`}
      </Button>
      <ArtModal {...args} art={sampleArt} isOpen={open} onClose={onClose} />
    </Box>
  )
}

export const Default: Story = {
  render: StoryWithHooks,
}
