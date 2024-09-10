import { FC, useState } from 'react'

import { useBoolean, useDisclosure } from '@chakra-ui/hooks'
import { Box, Portal, Stack } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { FaInfo, FaPlus } from 'react-icons/fa6'
import { MdOutlineTrendingUp } from 'react-icons/md'

import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@fc/chakra'
import { useHashtag } from '@fc/services'
import { HashtagStats, Markdown } from '@fc/ui'

type PlusButtonProps = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

export const PlusButton: FC<PlusButtonProps> = ({ source }) => {
  const infoDisclosure = useDisclosure()
  const statsDisclosure = useDisclosure()
  const [isEditing, setIsEditing] = useBoolean()
  const [activeButton, setActiveButton] = useState<'info' | 'stats'>()

  const { title } = useHashtag()

  const onClickInfo = () => {
    infoDisclosure.onOpen()
    setActiveButton('info')
  }

  const onClickStats = () => {
    statsDisclosure.onOpen()
    setActiveButton('stats')
  }

  const onClose = () => {
    if (activeButton === 'info') {
      infoDisclosure.onClose()
    } else {
      statsDisclosure.onClose()
    }
  }

  const onOpen = () => {
    if (activeButton === 'info') {
      infoDisclosure.onOpen()
    } else {
      statsDisclosure.onOpen()
    }
  }

  return (
    <Box>
      <Popover
        positioning={{ placement: 'top' }}
        onOpenChange={setIsEditing.toggle}
        closeOnInteractOutside
      >
        <PopoverTrigger>
          <IconButton
            position={'fixed'}
            zIndex={'modal'}
            isRound
            right={4}
            bottom={4}
            borderRadius={'100px'}
            colorPalette="primary"
            aria-label="Plus"
            size={'lg'}
            boxSize={{ base: 12, lg: 16 }}
            transform={isEditing ? 'rotate(135deg)' : 'none'}
            transition={'transform 0.3s ease-in-out'}
            icon={<FaPlus />}
          />
        </PopoverTrigger>
        <Portal>
          <PopoverContent p={0} w={'auto'} border={'none'} bg={'transparent'}>
            <PopoverBody p={0}>
              <Stack>
                <IconButton
                  aria-label={'stats'}
                  colorPalette={'primary'}
                  icon={<MdOutlineTrendingUp />}
                  disabled={statsDisclosure.open}
                  isRound
                  onClick={onClickStats}
                />

                <IconButton
                  aria-label={'info'}
                  colorPalette={'primary'}
                  icon={<FaInfo />}
                  disabled={infoDisclosure.open}
                  isRound
                  onClick={onClickInfo}
                />
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
      <Modal
        open={infoDisclosure.open}
        onOpenChange={e => (e.open ? onOpen() : onClose())}
        centered
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{<Markdown source={source} />}</ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        open={statsDisclosure.open}
        onOpenChange={e => (e.open ? onOpen() : onClose())}
        centered
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            <HashtagStats />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
