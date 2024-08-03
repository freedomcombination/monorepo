import { FC } from 'react'

import { ActionWrapper, ActionWrapperProps } from '../ActionWrapper'
import { Button, ButtonProps } from '../Button'

export type ActionButtonProps = Omit<ActionWrapperProps<ButtonProps>, 'ui'>

export const ActionButton: FC<ActionButtonProps> = props => {
  return <ActionWrapper {...props} ui={Button} />
}
