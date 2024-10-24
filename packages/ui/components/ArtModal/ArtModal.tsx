import { FC } from 'react'

import { Box } from '@chakra-ui/react'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@fc/chakra'

import { ArtModalProps } from './types'
import { ArtWithDetails } from '../ArtWithDetails'

export const ArtModal: FC<ArtModalProps> = ({
  art,
  refetch,
  isOpen,
  onClose,
}) => {
  return (
    <Box>
      <Modal
        onOpenChange={e => (e.open ? null : onClose())}
        open={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent maxW="95vw" p={{ base: 4, lg: 8 }}>
          <ModalBody p={0}>
            <ArtWithDetails art={art} refetch={refetch} />
          </ModalBody>
          <ModalCloseButton bg={'white'} rounded={'full'} />
        </ModalContent>
      </Modal>
    </Box>
  )
}
