import { FC, useState } from 'react'

import {
  Box,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { AiFillDelete, AiOutlineShareAlt } from 'react-icons/ai'

import { ASSETS_URL } from '@fc/config'
import { useDeleteModel } from '@fc/services'
import { Post, RecommendedTweet } from '@fc/types'

import { ShareButtons, WConfirm, WConfirmProps } from '../../components'
import { useFields, useSchema } from '../../data'
import { ModelCreateModal } from '../ModelForm'
import { TopicCardButton as ActionButton } from '../TopicCard'

export interface RecommendedSocialButtonsProps {
  tweet: RecommendedTweet
  isVertical?: boolean | undefined
}

export const RecommendedSocialButtons: FC<RecommendedSocialButtonsProps> = ({
  tweet,
  isVertical,
}) => {
  const deleteModelMutation = useDeleteModel('recommended-tweets')
  const [confirmState, setConfirmState] = useState<WConfirmProps>()
  const id = tweet?.id

  const fields = useFields()
  const schemas = useSchema()

  const { t } = useTranslation()

  const onDelete = () => {
    setConfirmState({
      isWarning: true,
      title: 'Delete Tweet',
      description: 'Are you sure you want to delete this tweet?',
      buttonText: 'Delete',
      onConfirm: async () => {
        deleteModelMutation.mutate(
          { id },
          {
            onSuccess: () => {
              setConfirmState(undefined)
            },
            onError: async errors => {
              console.error('Delete tweet mutation error', errors)
            },
          },
        )
        setConfirmState(undefined)
      },
    })
  }

  const mentions = tweet?.mentions
    ?.map(mention => `@${mention?.username}`)
    .join(' ')
  const quoteTweet = [tweet?.text, mentions].filter(a => !!a).join('\n\n')

  let imageUrl: string | unknown

  if (tweet?.image?.url) {
    imageUrl = ASSETS_URL + tweet?.image?.url
  }

  if (tweet?.originalTweet?.image) {
    imageUrl = tweet?.originalTweet?.image
  }

  const tweetImageUrl =
    (tweet?.originalTweet?.image || tweet?.originalTweet?.video) &&
    `https://x.com/${tweet.originalTweet?.user?.username}/status/${tweet?.originalTweet?.id}/video/1`

  const postContent = {
    title: tweet.text,
    description: tweet?.text,
    content: tweet?.text,
    image: {
      url: imageUrl,
    },
  } as Post

  return (
    <HStack
      justify={'space-between'}
      rounded="md"
      align={'space-between'}
      direction={isVertical ? 'column' : 'row'}
      overflow="hidden"
    >
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
      )}
      <Popover placement="top">
        <PopoverTrigger>
          <Box>
            <ActionButton
              onClick={() => null}
              icon={<AiOutlineShareAlt />}
              title="Share"
              variant="ghost"
              size="sm"
            />
          </Box>
        </PopoverTrigger>
        <PopoverContent w="max-content">
          <PopoverArrow />
          <PopoverBody>
            <ShareButtons
              // TODO: fix this
              quote={quoteTweet}
              url={tweetImageUrl as string}
              size="sm"
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <ModelCreateModal<Post>
        title={t('create-post')}
        endpoint={'posts'}
        schema={schemas.posts!}
        fields={fields.posts!}
        model={postContent}
        buttonProps={{
          iconSpacing: isVertical ? 0 : 2,
          variant: 'ghost',
          colorScheme: 'gray',
        }}
      >
        {!isVertical && t('create-post')}
      </ModelCreateModal>

      <ActionButton
        onClick={onDelete}
        icon={<AiFillDelete />}
        title="Delete"
        variant="ghost"
        colorScheme="gray"
      />
    </HStack>
  )
}
