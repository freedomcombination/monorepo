import { FC } from 'react'

import { Button } from '@chakra-ui/react'

import { ActionButtonProps } from './types'
import { ActionWrapper } from '../ActionWrapper'

export const ActionButton: FC<ActionButtonProps> = props => {
  return <ActionWrapper {...props} ui={Button} />
}
