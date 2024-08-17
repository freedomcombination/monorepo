import { FC } from 'react'

import { ActionWrapper, ActionWrapperProps } from '../ActionWrapper'
import { Tooltip, TooltipProps } from '../Tooltip'

export type ActionTooltipProps = Omit<ActionWrapperProps<TooltipProps>, 'ui'>

export const ActionTooltip: FC<ActionTooltipProps> = props => {
  return <ActionWrapper {...props} ui={Tooltip} />
}
