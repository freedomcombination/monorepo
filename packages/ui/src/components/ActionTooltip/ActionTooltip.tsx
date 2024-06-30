import { FC } from 'react'

import { Tooltip, TooltipProps } from '@chakra-ui/react'

import { ActionWrapper, ActionWrapperProps } from '../ActionWrapper'

export type ActionTooltipProps = Omit<ActionWrapperProps<TooltipProps>, 'ui'>

export const ActionTooltip: FC<ActionTooltipProps> = props => {
  return <ActionWrapper {...props} ui={Tooltip} />
}
