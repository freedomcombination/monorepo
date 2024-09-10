import { FC } from 'react'

import { useDisclosure } from '@chakra-ui/hooks'
import { Box, HStack, Link, Stack, Text } from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { BsThreeDots } from 'react-icons/bs'
import {
  TbBookmark,
  TbBrandTwitter,
  TbChartBar,
  TbClock,
  TbHeart,
  TbMessageCircle,
  TbRefresh,
  TbThumbUp,
} from 'react-icons/tb'
import { useLocalStorage } from 'usehooks-ts'

import {
  IconButton,
  Menu,
  MenuButton,
  MenuContent,
  MenuItem,
  MenuList,
  MenuRoot,
  MenuTrigger,
} from '@fc/chakra'
import { useRecommendTweet } from '@fc/services'
import { Post, RecommendedTweetCreateInput, Tweet } from '@fc/types'

import { TweetCardProps } from './types'
import { useFields, useSchema } from '../../hooks'
import { CreateTweetForm } from '../CreateTweetForm'
import { CreateTweetFormFieldValues } from '../CreateTweetForm/types'
import { ModelCreateModal } from '../ModelCreateModal'
import { TweetContent } from '../TweetContent'
import { WAvatar } from '../WAvatar'

export const TweetCard: FC<TweetCardProps> = ({
  tweet,
  bookmarkable,
  editable,
  setValue,
  isChangingMedia,
  toggleChangingMedia,
  originalTweet,
  isRecommended,
  ...rest
}) => {
  const [storageTweets, setStorageTweets] = useLocalStorage<Tweet[]>(
    'bookmarked-tweets',
    [],
  )
  const { open, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation()
  const { locale } = useRouter()

  const fields = useFields()
  const schemas = useSchema()

  const isBookmarked = storageTweets?.some(t => t.id === tweet.id)

  const { mutateAsync } = useRecommendTweet()

  const newPost = {
    description: tweet.text,
    content: tweet.text,
    image: { url: tweet?.image },
  } as Post

  const handleBookmark = () => {
    if (isBookmarked) {
      const filteredBookmarks = storageTweets?.filter(t => t.id !== tweet.id)
      setStorageTweets(filteredBookmarks)
    } else {
      setStorageTweets([...storageTweets, tweet])
    }
  }

  const handleEdit = () => {
    onOpen()
  }

  const handleSubmit = async (data: CreateTweetFormFieldValues) => {
    const recommendedTweet: RecommendedTweetCreateInput = {
      originalTweet: JSON.parse(JSON.stringify(originalTweet)),
      image: data.image,
      text: data.text,
      mentions: data.mentions?.map(m => Number(m.value)),
      locale,
    }

    await mutateAsync(recommendedTweet)
    onClose()
  }

  return (
    <>
      {open && (
        <CreateTweetForm
          onSubmit={handleSubmit}
          isOpen={open}
          onClose={onClose}
          originalTweet={tweet as Tweet}
          isNews={false}
        />
      )}
      <HStack align={'start'} bg={'white'} rounded={'md'} p={4} {...rest}>
        {tweet.user && (
          <WAvatar
            size={'sm'}
            flexShrink={0}
            name={tweet.user.name}
            src={tweet.user.profile}
          />
        )}

        <Stack flex={1} gap={4}>
          {/* Tweet Header */}
          <HStack justify={'space-between'} title={tweet.user?.username}>
            {tweet.user && (
              <Box lineHeight={1.15}>
                <Text lineClamp={1} wordBreak={'break-all'} fontWeight={700}>
                  {tweet.user.name}
                </Text>
                <Text lineClamp={1} color={'gray.500'}>
                  @{tweet.user.username}
                </Text>
              </Box>
            )}

            {(bookmarkable || editable) && (
              <MenuRoot positioning={{ placement: 'bottom-end' }}>
                <MenuTrigger asChild value="recommend">
                  <IconButton
                    size="sm"
                    rounded="full"
                    icon={<BsThreeDots />}
                    variant="ghost"
                  />
                </MenuTrigger>
                <MenuContent>
                  {!isRecommended && (
                    <MenuItem value="recommend" onClick={handleEdit}>
                      <TbThumbUp />
                      Recommend
                    </MenuItem>
                  )}
                  <ModelCreateModal<Post>
                    title={t('create-post')}
                    endpoint={'posts'}
                    schema={schemas.posts!}
                    fields={fields.posts!}
                    model={newPost}
                    buttonProps={{
                      variant: 'ghost',
                      w: 'full',
                      justifyContent: 'start',
                      colorPalette: 'gray',
                      leftIcon: <Box fontSize={'sm'} as={TbBrandTwitter} />,
                      rounded: 'none',
                      fontWeight: 400,
                      px: 3,
                    }}
                  >
                    {t('create-post')}
                  </ModelCreateModal>
                  <MenuItem value="bookmark" onClick={handleBookmark}>
                    <TbBookmark color={isBookmarked ? 'red' : ''} />
                    {isBookmarked ? 'Remove' : 'Save'} (Bookmark)
                  </MenuItem>
                </MenuContent>
              </MenuRoot>
            )}
          </HStack>

          <TweetContent
            tweet={tweet}
            setValue={setValue}
            isChangingMedia={isChangingMedia}
            toggleChangingMedia={toggleChangingMedia}
          />
          <HStack justify={'space-between'}>
            {tweet.likes != null && (
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={`https://x.com/intent/like?tweet_id=${tweet.id}`}
              >
                <HStack>
                  <TbHeart />
                  <Text fontSize={'sm'}>{tweet.likes}</Text>
                </HStack>
              </Link>
            )}
            {tweet.retweets != null && (
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={`https://x.com/intent/retweet?tweet_id=${tweet.id}`}
              >
                <HStack>
                  <TbRefresh />
                  <Text fontSize={'sm'}>{tweet.retweets}</Text>
                </HStack>
              </Link>
            )}
            {tweet.replies != null && (
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={`https://x.com/intent/tweet?in_reply_to=${tweet.id}`}
              >
                <HStack>
                  <TbMessageCircle />
                  <Text fontSize={'sm'}>{tweet.replies}</Text>
                </HStack>
              </Link>
            )}
            {tweet.impressions != null && (
              <HStack>
                <TbChartBar />
                <Text fontSize={'sm'}>{tweet.impressions}</Text>
              </HStack>
            )}
            {tweet.createdAt && (
              <HStack>
                <TbClock />
                <Text
                  lineClamp={1}
                  fontSize={'sm'}
                  color={'gray.500'}
                  textAlign={'right'}
                >
                  {formatDistanceToNow(new Date(tweet.createdAt as string), {
                    addSuffix: true,
                  })}
                </Text>
              </HStack>
            )}
          </HStack>
        </Stack>
      </HStack>
    </>
  )
}
