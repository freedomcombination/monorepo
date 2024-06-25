import { FC } from 'react'

import { Box, Button, HStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AiFillHeart } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa'

import { RecaptchaKeys, SITE_URL } from '@fc/config'
import { useArtBySlug, useLikeArt, useRecaptchaToken } from '@fc/services'
import { Art } from '@fc/types'

import { ArtCardImage } from '../ArtCard/ArtCardImage'
import { ShareButtons } from '../ShareButtons'

export const ArtDetail: FC = () => {
  const router = useRouter()
  const locale = router.locale
  const { data: art, refetch } = useArtBySlug()
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
    <Box bg="white" padding={4} boxShadow="base">
      <ArtCardImage art={art} />

      <HStack bg="white" justify="center" mt={4}>
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
