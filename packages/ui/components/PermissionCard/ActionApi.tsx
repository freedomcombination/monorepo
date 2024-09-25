import { FC } from 'react'

import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react'
import { TbCheck, TbX } from 'react-icons/tb'

import { ActionApiProps } from './types'

export const ActionApi: FC<ActionApiProps> = ({
  action,
  value,
  onChange,
  blocked,
  readonly,
}) => {
  return (
    <Tag
      size={'md'}
      onClick={() => !readonly && onChange(!value)}
      variant={'solid'}
      colorScheme={blocked ? 'gray' : value ? 'green' : 'red'}
      {...(!readonly
        ? {
            cursor: 'pointer',
            _hover: { boxShadow: 'lg' },
          }
        : {})}
    >
      <TagLeftIcon boxSize="18px" as={value ? TbCheck : TbX} />
      <TagLabel>{action}</TagLabel>
    </Tag>
  )
}
