import { FC } from 'react'

import { Badge, Box, IconButton, IconButtonProps } from '@chakra-ui/react'
import { FaEnvelope } from 'react-icons/fa6'

import { useDevMail } from './useDevMail'

export const DevMailButton: FC<IconButtonProps> = props => {
  const { onOpen, count } = useDevMail()

  return (
    <Box pos={'relative'} w={'max'}>
      <IconButton
        pos={'relative'}
        icon={<FaEnvelope />}
        onClick={onOpen}
        isRound
        colorScheme="gray"
        variant={'outline'}
        {...props}
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
