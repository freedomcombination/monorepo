import { FC } from 'react'

import {
  Button,
  HStack,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AiOutlineEye } from 'react-icons/ai'
import { HiPlus } from 'react-icons/hi'
import { IoCloseSharp } from 'react-icons/io5'

import { ArtAddToCollectionCardProps } from './types'
import { ActionButton } from '../ActionButton'
import { ArtCardImage } from '../ArtCardImage'
import { ArtModal } from '../ArtModal'

export const ArtAddToCollectionCard: FC<ArtAddToCollectionCardProps> = ({
  isAdded,
  isLoading,
  art,
  onAdd,
  onRemove,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const router = useRouter()

  const titleKey = `title_${router.locale}` as const

  const onHandle = () => {
    if (isAdded) {
      onRemove(art)
    } else {
      onAdd(art)
    }
  }

  return (
    <Stack boxShadow="md" rounded="md" direction={'column'} overflow="hidden">
      <ArtCardImage art={art} h={300} />
      <Stack w="full" px={4} py={2}>
        <Text fontSize="md" fontWeight={600} noOfLines={1}>
          {art[titleKey]}
        </Text>

        <Text fontSize="sm" noOfLines={2}>
          {art.artist?.name || art.artist?.email}
        </Text>

        <HStack justify="space-between" w="full">
          <Button
            data-testid="view-button"
            leftIcon={<AiOutlineEye />}
            title="View"
            onClick={onOpen}
            variant={'ghost'}
            colorScheme={'gray'}
            size="xs"
          >
            View
          </Button>

          <Spacer />

          <ActionButton
            data-testid="add-to-collection-button"
            canCreate="collections"
            variant={'outline'}
            colorScheme={isAdded ? 'red' : 'green'}
            leftIcon={isAdded ? <IoCloseSharp /> : <HiPlus />}
            size="xs"
            isLoading={isLoading}
            onClick={onHandle}
          >
            {isAdded ? 'Remove' : 'Add to Collection'}
          </ActionButton>
        </HStack>
      </Stack>
      <ArtModal
        refetch={() => {}}
        art={art}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Stack>
  )
}
