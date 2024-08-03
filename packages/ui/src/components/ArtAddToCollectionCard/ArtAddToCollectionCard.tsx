import { FC } from 'react'

import { useDisclosure } from '@chakra-ui/hooks'
import { HStack, Spacer, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AiOutlineEye } from 'react-icons/ai'
import { HiPlus } from 'react-icons/hi'
import { IoCloseSharp } from 'react-icons/io5'

import { ArtAddToCollectionCardProps } from './types'
import { ActionButton } from '../ActionButton'
import { ArtCardImage } from '../ArtCardImage'
import { ArtModal } from '../ArtModal'
import { Button } from '../Button'

export const ArtAddToCollectionCard: FC<ArtAddToCollectionCardProps> = ({
  isAdded,
  isLoading,
  art,
  onAdd,
  onRemove,
}) => {
  const { open, onOpen, onClose } = useDisclosure()

  const router = useRouter()

  const titleKey = `title_${router.locale}` as const

  return (
    <Stack boxShadow="md" rounded="md" direction={'column'} overflow="hidden">
      <ArtCardImage art={art} h={300} />
      <Stack w="full" px={4} py={2}>
        <Text fontSize="md" fontWeight={600} lineClamp={1}>
          {art[titleKey]}
        </Text>

        <Text fontSize="sm" lineClamp={2}>
          {art.artist?.name || art.artist?.email}
        </Text>

        <HStack justify="space-between" w="full">
          <Button
            leftIcon={<AiOutlineEye />}
            title="View"
            onClick={onOpen}
            variant={'ghost'}
            colorPalette={'gray'}
            size="xs"
          >
            View
          </Button>

          <Spacer />

          <ActionButton
            canCreate="collections"
            variant={'outline'}
            colorPalette={isAdded ? 'red' : 'green'}
            leftIcon={isAdded ? <IoCloseSharp /> : <HiPlus />}
            size="xs"
            isLoading={isLoading}
            onClick={() => {
              isAdded ? onRemove(art) : onAdd(art)
            }}
          >
            {isAdded ? 'Remove' : 'Add to Collection'}
          </ActionButton>
        </HStack>
      </Stack>
      <ArtModal refetch={() => {}} art={art} isOpen={open} onClose={onClose} />
    </Stack>
  )
}
