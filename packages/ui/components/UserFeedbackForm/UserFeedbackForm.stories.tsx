import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { StoryObj, Meta, StoryFn } from '@storybook/react'

import { CreateUserFeedbackFormProps } from './types'
import { UserFeedbackForm } from './UserFeedbackForm'

export default {
  title: 'Forms/UserFeedbackForm',
  component: UserFeedbackForm,
  args: {},
} as Meta<typeof UserFeedbackForm>

type Story = StoryObj<CreateUserFeedbackFormProps>

const StoryWithHook: StoryFn<CreateUserFeedbackFormProps> = args => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <Button onClick={onOpen} m={4}>
        {`Open UserFeedback Form`}
      </Button>
      <UserFeedbackForm {...args} isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export const Default: Story = {
  render: StoryWithHook,
}
