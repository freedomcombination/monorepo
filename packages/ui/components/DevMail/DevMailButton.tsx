import { FC } from 'react'

import { Badge, Box } from '@chakra-ui/react'
import { FaEnvelope } from 'react-icons/fa6'

import { IconButton, IconButtonProps } from '@fc/chakra'

import { useDevMail } from './useDevMail'

export const DevMailButton: FC<
  Omit<Omit<IconButtonProps, 'icon'>, 'aria-label'>
> = props => {
  const { onOpen, count } = useDevMail()

  return (
    <Box pos={'relative'} w={'max'}>
      <IconButton
        aria-label="Open DevMail"
        pos={'relative'}
        onClick={onOpen}
        isRound
        colorScheme="gray"
        variant={'outline'}
        {...props}
        icon={<FaEnvelope />}
      />
      {count > 0 && (
        <div>
          <Badge
            position={'absolute'}
            top={-2}
            right={-2}
            rounded={'full'}
            colorScheme={'orange'}
            variant={'solid'}
            boxSize={6}
            lineHeight={6}
            textAlign={'center'}
          >
            {count}
          </Badge>
        </div>
      )}
    </Box>
  )
}
