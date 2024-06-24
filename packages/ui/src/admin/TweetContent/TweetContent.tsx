import { Box, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { FieldValues, Path } from 'react-hook-form'
import twitterText from 'twitter-text'

import { RecommendedTweet, StrapiModel } from '@fc/types'
import { getMediaUrl } from '@fc/utils'

import { TweetContentProps } from './types'
import { VideoPlayer, WImage } from '../../components'
import { ModelMedia } from '../ModelForm/ModelMedia'

export const TweetContent = <T extends FieldValues>({
  tweet,
  horizontal,
  isChangingMedia,
  toggleChangingMedia,
  setValue,
}: TweetContentProps<T>) => {
  if (!tweet) return null

  const originalTweetUrl = (tweet as unknown as RecommendedTweet).originalTweet
    ?.image

  const imageUrl = getMediaUrl(tweet.image)
  const videoUrl = getMediaUrl(tweet.video)

  return (
    <Stack spacing={4}>
      <SimpleGrid columns={{ base: 1, lg: horizontal ? 2 : 1 }} gap={2}>
        <Text
          wordBreak={'break-word'}
          whiteSpace={'pre-wrap'}
          sx={{ '& a': { color: 'twitter.500' } }}
          dangerouslySetInnerHTML={{
            __html: twitterText?.autoLink(tweet?.text || ''),
          }}
        />
        <Box boxSize={'full'}>
          {setValue && isChangingMedia && toggleChangingMedia ? (
            <ModelMedia
              isEditing={true}
              model={
                {
                  image: { url: imageUrl || originalTweetUrl },
                  video: { url: videoUrl },
                } as unknown as StrapiModel
              }
              setValue={setValue}
              isChangingMedia={tweet?.image ? isChangingMedia : true}
              toggleChangingMedia={toggleChangingMedia}
              name={(tweet?.video ? 'video' : 'image') as Path<T>}
            />
          ) : (
            <>
              {/* Video */}
              {tweet.video && (
                <VideoPlayer url={tweet.video} light={tweet.image as string} />
              )}
              {/* Image */}
              {!tweet.video && tweet.image && (
                <WImage
                  hasZoom
                  unoptimized
                  ratio="twitter"
                  src={tweet.image}
                  rounded={'lg'}
                  alt={tweet.text}
                />
              )}
            </>
          )}
        </Box>
      </SimpleGrid>
    </Stack>
  )
}
