import { FC } from 'react'

import { Button, ButtonProps } from '@chakra-ui/react'

import { ActionWrapper, ActionWrapperProps } from '../ActionWrapper'

export type ActionButtonProps = Omit<ActionWrapperProps<ButtonProps>, 'ui'>

export const ActionButton: FC<ActionButtonProps> = props => {
  return <ActionWrapper {...props} ui={Button} />
}
