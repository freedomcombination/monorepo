import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { TWEET_MOCKS } from '@fc/mocks/tweet'
import { useCreateModelMutation } from '@fc/services/common/createModel'
import type { RecommendedTweet, RecommendedTweetCreateInput } from '@fc/types'

import { CreateTweetForm } from './CreateTweetForm'
import { CreateTweetFormFieldValues, CreateTweetFormProps } from './types'

export default {
  title: 'Forms/CreateTweetForm',
  component: CreateTweetForm,
  args: {
    originalTweet: TWEET_MOCKS?.[1],
  },
} as Meta<typeof CreateTweetForm>

type Story = StoryObj<CreateTweetFormProps>

const StoryWithHook: StoryFn<CreateTweetFormProps> = args => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { mutateAsync } = useCreateModelMutation<
    RecommendedTweet,
    RecommendedTweetCreateInput
  >('recommended-tweets')

  const handleSubmit = async (data: CreateTweetFormFieldValues) => {
    const recommendedTweet: RecommendedTweetCreateInput = {
      originalTweet: JSON.parse(JSON.stringify(args.originalTweet)),
      image: data.image,
      text: data.text,
      locale: 'en',
      mentions: [],
    }

    await mutateAsync(recommendedTweet, {
      onSuccess: () => {
        onClose()
      },
    })
    onClose()
  }
  const handleSizeClick = () => {
    onOpen()
  }

  return (
    <Box>
      <Button onClick={() => handleSizeClick()} m={4}>
        {`Create Tweet`}
      </Button>
      <CreateTweetForm
        {...args}
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={onClose}
        originalTweet={args.originalTweet}
      />
    </Box>
  )
}

export const Default: Story = {
  render: StoryWithHook,
}
