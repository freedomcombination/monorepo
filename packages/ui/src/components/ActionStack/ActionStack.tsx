import { FC } from 'react'

import { Stack, StackProps } from '@chakra-ui/react'

import { ActionWrapper, ActionWrapperProps } from '../ActionWrapper'

export type ActionStackProps = Omit<ActionWrapperProps<StackProps>, 'ui'>

export const ActionStack: FC<ActionStackProps> = props => {
  return <ActionWrapper {...props} ui={Stack} />
}
