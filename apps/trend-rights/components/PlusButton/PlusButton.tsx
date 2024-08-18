import { FC, useState } from 'react'

import { useBoolean, useDisclosure } from '@chakra-ui/hooks'
import {
  Box,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
} from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { FaInfo, FaPlus } from 'react-icons/fa6'
import { MdOutlineTrendingUp } from 'react-icons/md'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
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

  return (
    <Box>
      <Popover
        placement="top"
        onOpen={setIsEditing.on}
        onClose={setIsEditing.off}
        closeOnBlur
      >
        <PopoverTrigger>
          <IconButton
            position={'fixed'}
            zIndex={'modal'}
            isRound
            right={4}
            bottom={4}
            borderRadius={'100px'}
            colorScheme="primary"
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
                  colorScheme={'primary'}
                  icon={<MdOutlineTrendingUp />}
                  disabled={statsDisclosure.isOpen}
                  isRound
                  onClick={onClickStats}
                />

                <IconButton
                  aria-label={'info'}
                  colorScheme={'primary'}
                  icon={<FaInfo />}
                  disabled={infoDisclosure.isOpen}
                  isRound
                  onClick={onClickInfo}
                />
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
      <Modal
        isOpen={infoDisclosure.isOpen}
        onClose={onClose}
        centered
        size={'2xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{<Markdown source={source} />}</ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={statsDisclosure.isOpen}
        onClose={onClose}
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
