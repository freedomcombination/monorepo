import { FC } from 'react'

import { Tooltip } from '@chakra-ui/react'

import { ActionTooltipProps } from './types'
import { ActionWrapper } from '../ActionWrapper'

export const ActionTooltip: FC<ActionTooltipProps> = props => {
  return <ActionWrapper {...props} ui={Tooltip} />
}
