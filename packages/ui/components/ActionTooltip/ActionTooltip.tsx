import { FC } from 'react'

import { Tooltip, TooltipProps } from '@fc/chakra'

import { ActionTooltipProps } from './types'
import { ActionWrapper } from '../ActionWrapper'

export const ActionTooltip: FC<ActionTooltipProps> = props => {
  return <ActionWrapper<TooltipProps> {...props} ui={Tooltip} />
}
