import { TooltipProps } from '@chakra-ui/react'

import { ActionWrapperProps } from '../ActionWrapper'

export type ActionTooltipProps = Omit<ActionWrapperProps<TooltipProps>, 'ui'>
