import { FC, useEffect, useState } from 'react'

import { Link } from '@chakra-ui/next-js'
import {
  Badge,
  Box,
  HStack,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AiFillHeart } from 'react-icons/ai'
import { FaExternalLinkSquareAlt } from 'react-icons/fa'

import {
  useDeleteModel,
  usePublishModel,
  useUnpublishModel,
} from '@fc/services'

import { ArtCardActions } from './ArtCardActions'
import { ArtCardAlertDialog } from './ArtCardAlertDialog'
import { ArtCardImage } from './ArtCardImage'
import { ArtActionType, ArtCardBaseProps } from './types'
import { ArtModal } from '../ArtModal'
import { WAvatar } from '../WAvatar'

export const ArtCardBase: FC<ArtCardBaseProps> = ({
  art,
  isMasonry,
  toggleLike,
  isLiked,
  actions,
  isOwner,
  isModal = false,
}) => {
  const {
    isOpen: artModalIsOpen,
    onOpen: artModalOnOpen,
    onClose: artModalOnClose,
  } = useDisclosure()

  const [actionType, setActionType] = useState<ArtActionType>()
  const [hover, setHover] = useState({ color: 'gray.100' })
  const [color, setColor] = useState('white')

  const router = useRouter()
  const locale = router.locale

  const deleteMutation = useDeleteModel('arts')
  const publishMutation = usePublishModel('arts')
  const unpublishMutation = useUnpublishModel('arts')

  useEffect(() => {
    setHover({ color: isLiked ? 'red.200' : 'gray.100' })
    setColor(isLiked ? 'red.400' : 'white')
  }, [isLiked])

  const onClickLink = () => {
    if (isModal) {
      artModalOnOpen()
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
    switch (type) {
      case 'delete':
        deleteMutation.mutate({ id: art.id })
        break
      case 'publish':
        publishMutation.mutate({ id: art.id })
        break
      case 'unpublish':
        unpublishMutation.mutate({ id: art.id })
        break
      default:
        setActionType(type)
        onOpen()
    }
  }

  return (
    <>
      {/* Card Action Alert Dialog */}
      {actions && actionType && (
        <ArtCardAlertDialog
          title={actions[actionType].title}
          text={actions[actionType].text}
          onClose={onClose}
          onClick={actions[actionType].onClick}
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
        <ArtCardImage art={art} isMasonry={isMasonry} locale={locale} />

        {!art.publishedAt && (
          <Badge left={2} pos="absolute" top={2} userSelect="none">
            Draft
          </Badge>
        )}

        {/* Card Body */}
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

        <HStack
          _groupHover={{ top: 2, right: 2 }}
          justify="end"
          position="absolute"
          right={{ base: 2, lg: '-150%' }}
          top={{ base: 2, lg: '-150%' }}
          transition="all 0.2s"
          w="full"
        >
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

          {/* Card Owner Actions */}
          {isOwner && (
            <ArtCardActions
              isPublished={!!art.publishedAt}
              onHandleAction={onHandleAction}
            />
          )}
        </HStack>

        <HStack
          align="center"
          bgGradient="linear(to-t, blackAlpha.700, transparent)"
          bottom={0}
          p={{ base: 2, lg: 0 }}
          pos={{ base: 'absolute', lg: 'static' }}
          pt={{ base: 12, lg: 0 }}
          w="full"
        >
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
          <ArtModal
            art={art}
            isOpen={artModalIsOpen}
            onClose={artModalOnClose}
          />
        </HStack>
      </Box>
    </>
  )
}
