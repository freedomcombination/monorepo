import { FC } from 'react'

import { Badge, Box, Button } from '@chakra-ui/react'

import { useDevMail } from './useDevMail'

export const DevMailButton: FC = () => {
  const { isOpen, onOpen, count } = useDevMail()

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
      left={-2}
      onClick={onOpen}
      isDisabled={isOpen}
      colorScheme="primary"
      aria-label="Open Mails"
      transform="rotate(0deg)"
      sx={{ writingMode: 'vertical-rl' }}
      borderBottomLeftRadius={0}
      borderTopLeftRadius={0}
      transition={'all 0.2s'}
      animation={'pulse 1s infinite'}
      pl={2}
      pr={1}
      _hover={{
        transform: 'rotate(0deg) scale(1.1)',
        left: 0,
        pl: 2,
      }}
    >
      <Box position={'relative'}>
        Open Mails
        {count > 0 && (
          <Badge
            position={'absolute'}
            bottom={-5}
            right={-5}
            rounded={'full'}
            colorScheme={'red'}
            px={3}
            variant={'solid'}
            fontSize={'lg'}
          >
            {count}
          </Badge>
        )}
      </Box>
    </Button>
  )
}
