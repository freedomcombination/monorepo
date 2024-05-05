import { FC } from 'react'

import { Button, Center, HStack, Text } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { track } from '@vercel/analytics'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { TwitterShareButton } from 'next-share'
import { FaXTwitter } from 'react-icons/fa6'
import { GoMention } from 'react-icons/go'
import { MdTrendingUp } from 'react-icons/md'

import { SITE_URL } from '@fc/config'
import { useHashtag, useUpdateHashtagSentence } from '@fc/services'
import { RedisPost } from '@fc/types'

import { PostMakerTweetProgress } from './PostMakerTweetProgress'
import { PostMakerTweetShare } from './PostMakerTweetShare'
import { useHashtagContext } from '../HashtagProvider'
import { usePostContext } from '../PostProvider'

type PostMakerTweetButtonsProps = {
  isIosSafari?: boolean
}

export const PostMakerTweetButtons: FC<PostMakerTweetButtonsProps> = ({
  isIosSafari,
}) => {
  const router = useRouter()
  const { setActivePostId, mentionsDisclosure, trendsDisclosure } =
    useHashtagContext()

  const hashtag = useHashtag()
  const { postContent, post, sentence } = usePostContext()

  const { asPath, locale } = router
  const queryClient = useQueryClient()
  const updatePostSentence = useUpdateHashtagSentence()

  const { t } = useTranslation()

  if (!sentence || !post) return null

  const url = `\n\n${SITE_URL}/${locale}${asPath}?id=${post.id}`

  const baseUrl = 'https://x.com/intent/tweet'
  const params = {
    url,
    text: `${postContent}`,
  }
  const queryParams = new URLSearchParams(params)

  const postUrl = `${baseUrl}?${queryParams.toString()}`

  const onTweet = async () => {
    window.open(postUrl, '_blank')
  }

  const onShare = async () => {
    const { value, index, shareCount = 0, isPublished } = sentence || {}
    track('post_maker', { action: 'tweet' })

    const published = isPublished ? 1 : 0
    const shares = shareCount + 1
    const sentenceValue =
      `${value}::${post.id}::${shares}::${published}` as RedisPost

    if (post && !Number.isNaN(index)) {
      try {
        await updatePostSentence.mutateAsync(
          {
            hashtagId: hashtag.id,
            index,
            value: sentenceValue,
          },
          {
            onSuccess: async () => {
              await queryClient.invalidateQueries({
                queryKey: ['kv-hashtag-sentences', hashtag.id],
              })
            },
          },
        )
      } catch (error) {
        console.error('Update sentence error', error)
      }
    }
  }

  if (!post) return null

  return (
    <HStack justifyContent={'space-between'} spacing={{ base: 0, lg: 4 }}>
      <Button
        variant={'ghost'}
        colorScheme={'gray'}
        onClick={() => {
          track('post_maker', { action: 'add_mentions' })
          setActivePostId(post.id)
          mentionsDisclosure.onOpen()
        }}
        iconSpacing={{ base: 0, md: 2 }}
        leftIcon={<GoMention />}
      >
        <Text isTruncated display={{ base: 'none', md: 'block' }}>
          {t('post.add-mention')}
        </Text>
      </Button>

      <Button
        variant={'ghost'}
        colorScheme={'gray'}
        onClick={() => {
          track('post_maker', { action: 'add_trends' })
          setActivePostId(post.id)
          trendsDisclosure.onOpen()
        }}
        iconSpacing={{ base: 0, md: 2 }}
        leftIcon={<MdTrendingUp />}
      >
        <Text isTruncated display={{ base: 'none', md: 'block' }}>
          {t('post.add-trend')}
        </Text>
      </Button>

      <PostMakerTweetProgress />

      {!isIosSafari && (
        <Button
          role={'group'}
          iconSpacing={{ base: 0, md: 2 }}
          leftIcon={<FaXTwitter />}
          onClick={() => {
            onShare().then(() => onTweet())
          }}
          flexShrink={0}
          colorScheme={'gray'}
          bg={'black'}
          fontWeight={600}
          _hover={{ bg: 'gray.800' }}
        >
          <Text mr={4}>{t('post.share')}</Text>
          <Center
            _groupHover={{ borderColor: 'gray.800' }}
            bg={'white'}
            borderColor={'black'}
            borderWidth={2}
            boxSize={8}
            color={'black'}
            fontSize={'sm'}
            pos={'absolute'}
            right={-2}
            rounded={'full'}
            top={-2}
          >
            {sentence.shareCount}
          </Center>
        </Button>
      )}

      {isIosSafari && (
        <TwitterShareButton url={url} title={postContent}>
          <Button
            role={'group'}
            pos={'relative'}
            as={'span'}
            colorScheme={'gray'}
            bg={'black'}
            flexShrink={0}
            iconSpacing={{ base: 0, md: 2 }}
            leftIcon={<FaXTwitter />}
            onClick={onShare}
            fontWeight={600}
            _hover={{ bg: 'gray.800' }}
          >
            <Text mr={2}>{t('post.share')}</Text>
            <Center
              _groupHover={{ borderColor: 'gray.800' }}
              bg={'white'}
              borderColor={'black'}
              borderWidth={2}
              boxSize={8}
              color={'black'}
              fontSize={'sm'}
              pos={'absolute'}
              right={-2}
              rounded={'full'}
              top={-2}
            >
              {sentence.shareCount}
            </Center>
          </Button>
        </TwitterShareButton>
      )}

      <PostMakerTweetShare url={url} content={post?.description as string} />
    </HStack>
  )
}
