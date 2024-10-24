import { TooltipProps } from '@fc/chakra'

import { ActionWrapperProps } from '../ActionWrapper'

export type ActionTooltipProps = Omit<ActionWrapperProps<TooltipProps>, 'ui'>
