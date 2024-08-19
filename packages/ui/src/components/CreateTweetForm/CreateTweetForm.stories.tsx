import { useDisclosure } from '@chakra-ui/hooks'
import { Box } from '@chakra-ui/react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { Button } from '@fc/chakra'
import { TWEET_MOCKS } from '@fc/mocks'
import { useRecommendTweet } from '@fc/services'
import { RecommendedTweetCreateInput } from '@fc/types'

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
  const { open, onOpen, onClose } = useDisclosure()

  const { mutateAsync } = useRecommendTweet()

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
        isOpen={open}
        onClose={onClose}
        originalTweet={args.originalTweet}
      />
    </Box>
  )
}

export const Default: Story = {
  render: StoryWithHook,
}
