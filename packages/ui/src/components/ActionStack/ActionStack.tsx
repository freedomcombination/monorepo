import { FC } from 'react'

import { Stack } from '@chakra-ui/react'

import { ActionStackProps } from './types'
import { ActionWrapper } from '../ActionWrapper'

export const ActionStack: FC<ActionStackProps> = props => {
  return <ActionWrapper {...props} ui={Stack} />
}
