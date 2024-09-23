import { Box, useDisclosure } from '@chakra-ui/react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { Button } from '@fc/chakra'

import { CreateUserFeedbackFormProps } from './types'
import { UserFeedbackForm } from './UserFeedbackForm'

export default {
  title: 'Forms/UserFeedbackForm',
  component: UserFeedbackForm,
  args: {},
} as Meta<typeof UserFeedbackForm>

type Story = StoryObj<CreateUserFeedbackFormProps>

const StoryWithHook: StoryFn<CreateUserFeedbackFormProps> = args => {
  const { open, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <Button onClick={onOpen} m={4}>
        {`Open UserFeedback Form`}
      </Button>
      <UserFeedbackForm {...args} isOpen={open} onClose={onClose} />
    </Box>
  )
}

export const Default: Story = {
  render: StoryWithHook,
}
