import { Box, Button } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
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
