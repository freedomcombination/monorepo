import { useMemo } from 'react'

import { useBoolean } from '@chakra-ui/hooks'
import { Box, HStack, Progress, Stack, Text, Textarea } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { FieldErrorsImpl, useForm } from 'react-hook-form'
import { FiArrowUpRight } from 'react-icons/fi'
import { GrFormClose } from 'react-icons/gr'
import stringSimilarity from 'string-similarity'
import { ObjectSchema } from 'yup'

import { useRecommendTweet } from '@fc/services'
import { Mention, Tweet } from '@fc/types'

import { createTweetSchema } from './schema'
import { CreateTweetFormFieldValues, CreateTweetFormProps } from './types'
import { Button } from '../Button'
import { FormLabel } from '../Form'
import { FormItem } from '../FormItem'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '../Modal'
import { ModelSelect } from '../ModelSelect'
import { TweetContent } from '../TweetContent'

export const CreateTweetForm: React.FC<CreateTweetFormProps> = ({
  isOpen,
  onClose,
  originalTweet,
  isNews,
}) => {
  const TWEET_LENGTH = 280
  const SIMILARITY_LIMIT = 60

  const { locale } = useRouter()
  const [isChangingImage, setIsChangingImage] = useBoolean(false)

  const { mutateAsync } = useRecommendTweet()

  if (isNews) {
    originalTweet = { text: originalTweet.text } as Tweet
  }

  const defaultValues = {
    text: '',
    image: undefined,
    mentions: [],
  }

  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<CreateTweetFormFieldValues>({
    resolver: yupResolver(
      createTweetSchema as ObjectSchema<CreateTweetFormFieldValues>,
    ),
    mode: 'all',
    values: defaultValues,
  })

  const [text, image] = watch(['text', 'image'])

  const similarity = useMemo(() => {
    if (!text || !originalTweet.text) return 0

    return (
      stringSimilarity.compareTwoStrings(
        text.toLowerCase(),
        originalTweet.text.toLowerCase() || '',
      ) * 100
    )
  }, [text, originalTweet.text])

  const closeModal = () => {
    reset()
    onClose()
  }

  const handleRecommend = async (data: CreateTweetFormFieldValues) => {
    const mentions = data.mentions?.map(mention => Number(mention.value)) || []

    await mutateAsync({
      originalTweet: JSON.parse(JSON.stringify(originalTweet)),
      text: data.text,
      mentions,
      image,
      locale,
    })

    closeModal()
  }

  return (
    <Box>
      <Modal
        size="4xl"
        onClose={closeModal}
        isOpen={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent p={{ base: 2, lg: 4 }}>
          <ModalCloseButton />
          <ModalHeader>
            <Text color={'primary.500'} fontWeight={700} w={'full'}>
              Create Tweet
            </Text>
          </ModalHeader>
          <ModalBody>
            <Stack gap={4} as="form" onSubmit={handleSubmit(handleRecommend)}>
              <Stack>
                <FormLabel fontWeight={600}>Original Tweet</FormLabel>
                <TweetContent<CreateTweetFormFieldValues>
                  horizontal
                  tweet={originalTweet as Tweet}
                  isChangingMedia={isChangingImage}
                  toggleChangingMedia={setIsChangingImage.toggle}
                  setValue={setValue}
                />
                <FormItem<CreateTweetFormFieldValues>
                  as={Textarea}
                  name="text"
                  label="New Tweet"
                  register={register}
                  errors={errors as FieldErrorsImpl<CreateTweetFormFieldValues>}
                  required
                />

                <ModelSelect<Mention>
                  isMulti
                  endpoint={'mentions'}
                  control={control as any}
                  name="mentions"
                  label="Mention"
                  errors={errors}
                />
                {/* TODO 
                ADD HASHTAG
                */}
                {/* plagiarism ................*/}
                <Stack>
                  <HStack>
                    <Text fontSize="md" fontWeight={600}>
                      Plagiarism
                    </Text>
                    <Text
                      color={text?.length >= TWEET_LENGTH ? 'red' : 'black'}
                    >
                      {text?.length}/280
                    </Text>
                  </HStack>

                  <Progress
                    colorPalette={
                      similarity > SIMILARITY_LIMIT ? 'red' : 'green'
                    }
                    size="lg"
                    value={similarity}
                  />
                  <Text fontSize="xs" color={'gray.500'} w={'full'}>
                    *The Lower is better
                  </Text>
                </Stack>
              </Stack>
              <HStack alignSelf="end">
                <Button
                  bg={'transparent'}
                  mr={3}
                  leftIcon={<GrFormClose />}
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  type={'submit'}
                  colorPalette="purple"
                  leftIcon={<FiArrowUpRight />}
                  disabled={similarity > SIMILARITY_LIMIT}
                >
                  Recommend
                </Button>
              </HStack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
