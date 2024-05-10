import { FC } from 'react'

import { Box } from '@chakra-ui/react'

import { TopicCardButtonProps } from './types'
import { ActionButton } from '../../components'

export const TopicCardButton: FC<TopicCardButtonProps> = ({
  icon,
  onClick,
  title,
  ...rest
}) => {
  return (
    <ActionButton
      aria-label={title}
      onClick={onClick}
      leftIcon={icon}
      iconSpacing={{ base: 0, lg: 2 }}
      {...rest}
    >
      <Box as="span" display={{ base: 'none', xl: 'inline' }}>
        {title}
      </Box>
    </ActionButton>
  )
}
