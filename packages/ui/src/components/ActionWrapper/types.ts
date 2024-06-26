import {
  ButtonProps,
  ChakraProps,
  StackProps,
  TooltipProps,
} from '@chakra-ui/react'

import { StrapiEndpoint } from '@fc/types'

export type ActionWrapperProps<T extends ChakraProps> = {
  canApprove?: StrapiEndpoint
  canCreate?: StrapiEndpoint
  canDelete?: StrapiEndpoint
  canUpdate?: StrapiEndpoint
  canRead?: StrapiEndpoint
  checkActions?: {
    endpoint: StrapiEndpoint
    actions: string[]
  }
  isVisible?: boolean
  onlyAdmin?: boolean
  ui: React.ElementType
} & T

export type ActionButtonProps = Omit<ActionWrapperProps<ButtonProps>, 'ui'>

export type ActionTooltipProps = Omit<ActionWrapperProps<TooltipProps>, 'ui'>

export type ActionStackProps = Omit<ActionWrapperProps<StackProps>, 'ui'>
