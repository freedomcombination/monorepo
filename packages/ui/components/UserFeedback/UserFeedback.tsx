import React from 'react'

import { Box, Button, useDisclosure } from '@chakra-ui/react'

import { UserFeedbackForm } from '../UserFeedbackForm'

export const UserFeedback = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Button
      role="button"
      as={'div'}
      cursor={'pointer'}
      top={'50%'}
      h={'fit-content'}
      position={'fixed'}
      zIndex={'modal'}
      fontSize={'sm'}
      right={-2}
      onClick={onOpen}
      isDisabled={isOpen}
      colorScheme="primary"
      aria-label="Give feedback"
      transform="rotate(180deg)"
      sx={{ writingMode: 'vertical-rl' }}
      borderBottomLeftRadius={0}
      borderTopLeftRadius={0}
      transition={'all 0.2s'}
      pr={1}
      pl={2}
      _hover={{
        transform: 'rotate(180deg) scale(1.1)',
        right: 0,
        pr: 2,
      }}
    >
      <Box>Feedback</Box>
      <UserFeedbackForm isOpen={isOpen} onClose={onClose} />
    </Button>
  )
}
