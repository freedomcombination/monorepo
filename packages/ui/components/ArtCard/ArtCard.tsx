import { FC, useEffect, useState } from 'react'

import {
  Badge,
  Box,
  HStack,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiFillHeart } from 'react-icons/ai'
import { FaExternalLinkSquareAlt } from 'react-icons/fa'

import { useAuthContext } from '@fc/context/auth'
import { useLikeArt } from '@fc/services/art/likeArt'
import { useDeleteModelMutation } from '@fc/services/common/deleteModel'
import { usePublishModelMutation } from '@fc/services/common/publishModel'
import { useUnpublishModelMutation } from '@fc/services/common/unpublishModel'

import { ArtCardActions } from './ArtCardActions'
import { ArtCardAlertDialog } from './ArtCardAlertDialog'
import { ArtActionType, ArtCardProps } from './types'
import { ArtCardImage } from '../ArtCardImage'
import { ArtModal } from '../ArtModal'
import { WAvatar } from '../WAvatar'

export const ArtCard: FC<ArtCardProps> = ({
  art,
  isMasonry,
  recaptchaToken,
  refetch,
  isModal = false,
  imageHeight,
}) => {
  const artModalDisclosure = useDisclosure()
  const { profile } = useAuthContext()

  const isOwner = profile?.id === art.artist?.id

  const [actionType, setActionType] = useState<ArtActionType>()
  const [hover, setHover] = useState({ color: 'gray.100' })
  const [color, setColor] = useState('white')

  const router = useRouter()

  const { toggleLike, isLiked } = useLikeArt({
    art,
    recaptchaToken,
    onSuccess: refetch,
  })

  const deleteMutation = useDeleteModelMutation('arts')
  const publishMutation = usePublishModelMutation('arts')
  const unpublishMutation = useUnpublishModelMutation('arts')

  useEffect(() => {
    setHover({ color: isLiked ? 'red.200' : 'gray.100' })
    setColor(isLiked ? 'red.400' : 'white')
  }, [isLiked])

  const onClickLink = () => {
    if (isModal) {
      artModalDisclosure.onOpen()
    } else {
      router.push(`/club/arts/${art.slug}`)
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  const artistName = art.artist?.name
  const artistEmail = art.artist?.email
  const artistAvatar =
    art.artist?.avatar?.formats?.thumbnail?.url || art.artist?.avatar?.url

  const onHandleAction = (type: ArtActionType) => {
    setActionType(type)
    onOpen()
  }

  const actions = {
    delete: {
      title: 'Delete Art',
      text: 'Are you sure you want to delete this art?',
      onClick: () => deleteMutation.mutate({ id: art.id }),
      colorScheme: 'red',
      buttonText: 'Delete',
    },
    publish: {
      title: 'Publish Art',
      text: 'Are you sure you want to publish this art?',
      onClick: () => publishMutation.mutate({ id: art.id }),
      colorScheme: 'green',
      buttonText: 'Publish',
    },
    unpublish: {
      title: 'Unpublish Art',
      text: 'Are you sure you want to unpublish this art?',
      onClick: () => unpublishMutation.mutate({ id: art.id }),
      colorScheme: 'red',
      buttonText: 'Unpublish',
    },
  }

  const handleAction = () => {
    if (!actionType) return

    actions[actionType].onClick()
    refetch?.()
    onClose()
  }

  return (
    <>
      <ArtModal
        art={art}
        isOpen={artModalDisclosure.isOpen}
        onClose={artModalDisclosure.onClose}
        refetch={refetch}
      />
      {/* Card Action Alert Dialog */}
      {actionType && (
        <ArtCardAlertDialog
          title={actions[actionType].title}
          text={actions[actionType].text}
          onClose={onClose}
          onClick={handleAction}
          isOpen={isOpen}
          colorScheme={actions[actionType].colorScheme}
          buttonText={actions[actionType].buttonText}
        />
      )}

      <Box
        w="full"
        userSelect="none"
        role="group"
        pos="relative"
        overflow="hidden"
      >
        {/* Card Image */}
        <ArtCardImage art={art} isMasonry={isMasonry} h={imageHeight} />

        {/* Card Overlay */}
        <Box
          _groupHover={{ left: 0 }}
          bgGradient="linear(to-t, blackAlpha.700, transparent, transparent, blackAlpha.700)"
          bottom={0}
          display={{ base: 'none', lg: 'block' }}
          h="full"
          left="-150%"
          position={{ base: 'static', lg: 'absolute' }}
          transition="all 0.2s ease-in-out"
          w="full"
        />

        {/* Card buttons */}
        <HStack
          _groupHover={{ top: 2, right: 2 }}
          justify="end"
          position="absolute"
          right={{ base: 2, lg: '-150%' }}
          top={{ base: 2, lg: '-150%' }}
          transition="all 0.2s"
          w="full"
        >
          {/* Like icon */}
          {!isOwner && (
            <HStack spacing={1}>
              <Text fontWeight={600} color="white">
                {art?.likes || 0}
              </Text>
              <IconButton
                _hover={hover}
                aria-label="like post"
                borderColor="whiteAlpha.500"
                borderWidth={1}
                color={color}
                colorScheme="blackAlpha"
                disabled={isOwner}
                icon={<AiFillHeart />}
                onClick={toggleLike}
                rounded="full"
              />
            </HStack>
          )}

          {/* Link icon */}
          {(isModal || art.publishedAt) && (
            <IconButton
              onClick={onClickLink}
              _hover={{ bg: 'primary.400' }}
              aria-label="view art"
              borderColor="whiteAlpha.500"
              borderWidth={1}
              color="white"
              colorScheme="blackAlpha"
              icon={<FaExternalLinkSquareAlt />}
              rounded="full"
            />
          )}

          {/* Card Owner Actions */}
          {isOwner && (
            <ArtCardActions
              isPublished={!!art.publishedAt}
              onHandleAction={onHandleAction}
            />
          )}
        </HStack>

        {/* Card info */}
        <HStack
          align="center"
          bgGradient="linear(to-t, blackAlpha.700, transparent)"
          bottom={0}
          p={{ base: 2, lg: 0 }}
          pos={{ base: 'absolute', lg: 'static' }}
          pt={{ base: 12, lg: 0 }}
          w="full"
        >
          {!art.publishedAt && (
            <Badge left={2} pos="absolute" top={2} userSelect="none">
              Draft
            </Badge>
          )}
          <Stack
            _groupHover={{ bottom: 2 }}
            bottom={'-150%'}
            color="white"
            fontSize={{ base: 'md', lg: 'sm' }}
            fontWeight={600}
            position={{ base: 'static', lg: 'absolute' }}
            spacing={0}
            transition="all 0.2s"
            w="full"
          >
            <Text
              display={{ base: 'none', lg: 'block' }}
              noOfLines={{ lg: 2 }}
              p={2}
              pb={0}
              fontWeight={900}
              fontSize={'lg'}
              textShadow={'1px 1px 4px #333'}
            >
              {art?.[`title_${router.locale}`]}
            </Text>

            <HStack
              href={`/club/artist/${art.artist?.id}`}
              as={Link}
              _hover={{ bg: 'whiteAlpha.300', borderColor: 'whiteAlpha.500' }}
              borderColor="transparent"
              borderWidth={1}
              m={1}
              p={1}
              rounded="lg"
              w="max-content"
            >
              <WAvatar
                size="xs"
                name={artistName || artistEmail}
                src={artistAvatar}
              />
              <Text noOfLines={1}>{artistName || artistEmail}</Text>
            </HStack>
          </Stack>
        </HStack>
      </Box>
    </>
  )
}
