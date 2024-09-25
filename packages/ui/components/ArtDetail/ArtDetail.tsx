import { FC } from 'react'

import { Box, Button, HStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AiFillHeart } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa'

import { RecaptchaKeys, SITE_URL } from '@fc/config/constants'
import { useLikeArt } from '@fc/services/art/likeArt'
import { useRecaptchaToken } from '@fc/services/common/useRecaptchaToken'
import type { Art } from '@fc/types'

import { ArtCardImage } from '../ArtCardImage'
import { ShareButtons } from '../ShareButtons'

type ArtDetailProps = {
  art: Art
  refetch?: () => void
}

export const ArtDetail: FC<ArtDetailProps> = ({ art, refetch }) => {
  const router = useRouter()
  const locale = router.locale

  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.LIKE_ART)

  const { toggleLike, isLiked, isLoading, isDisabled } = useLikeArt({
    art: art as Art,
    recaptchaToken,
    onSuccess: refetch,
  })

  if (!art) return null

  const url = `${SITE_URL}/${locale}/club/arts/${art.slug}`

  if (!art?.image?.length) return null

  return (
    <Box bg="white" shadow={'md'}>
      <ArtCardImage art={art} h={'full'} />

      <HStack bg="white" justify="center" py={4}>
        {art.views && (
          <HStack
            py={0.5}
            px={3}
            rounded="full"
            borderColor="gray.200"
            borderWidth={1}
          >
            <Text>{art.views}</Text>
            <Box as={FaEye} />
          </HStack>
        )}
        <Button
          data-testid="button-like"
          rounded="full"
          colorScheme={isLiked ? 'red' : 'gray'}
          rightIcon={<AiFillHeart />}
          onClick={() => toggleLike()}
          disabled={isDisabled}
          size="sm"
          variant="outline"
          isLoading={isLoading}
        >
          {(art?.likes || 0) + (art.likers?.length || 0)}
        </Button>
        <ShareButtons
          title={art?.[`title_${locale}`]}
          url={url}
          quote={art?.[`description_${locale}`] || ''}
        />
      </HStack>
    </Box>
  )
}
