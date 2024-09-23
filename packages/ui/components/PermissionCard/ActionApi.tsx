import { FC } from 'react'

import { TbCheck, TbX } from 'react-icons/tb'

import { Tag } from '@fc/chakra'

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
      colorPalette={blocked ? 'gray' : value ? 'green' : 'red'}
      {...(!readonly
        ? {
            cursor: 'pointer',
            _hover: { boxShadow: 'lg' },
          }
        : {})}
      startElement={
        value ? (
          <TbCheck width={'18px'} height={'18px'} />
        ) : (
          <TbX width={'18px'} height={'18px'} />
        )
      }
    >
      {action}
    </Tag>
  )
}
