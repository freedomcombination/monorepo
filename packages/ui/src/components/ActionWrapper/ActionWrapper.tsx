import React, { FC } from 'react'

import {
  Button,
  ButtonProps,
  ChakraProps,
  HStack,
  Stack,
  StackProps,
  Tooltip,
  TooltipProps,
} from '@chakra-ui/react'

import { useAuthContext } from '@fc/context'
import { StrapiEndpoint } from '@fc/types'

type ActionWrapperProps<T extends ChakraProps> = {
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

const ActionWrapper = <T extends ChakraProps>(
  props: ActionWrapperProps<T>,
): React.ReactElement<T> | null => {
  const {
    canApprove,
    canCreate,
    canDelete,
    canUpdate,
    canRead,
    checkActions,
    isVisible,
    onlyAdmin,
    ui: Component,
    ...rest
  } = props
  const auth = useAuthContext()

  if (isVisible === false) return null // not undefined, it has to be false
  if (onlyAdmin && !auth.isAdmin) return null // and rest, check permission if only they are not undefined
  if (canApprove && !auth.canApprove(canApprove)) return null
  if (canCreate && !auth.canCreate(canCreate)) return null
  if (canDelete && !auth.canDelete(canDelete)) return null
  if (canUpdate && !auth.canUpdate(canUpdate)) return null
  if (canRead && !auth.canRead(canRead)) return null
  if (
    checkActions &&
    !auth.checkActionsPermission(checkActions.endpoint, ...checkActions.actions)
  )
    return null

  return <Component {...rest} />
}

export type ActionButtonProps = Omit<ActionWrapperProps<ButtonProps>, 'ui'>
export const ActionButton: FC<ActionButtonProps> = props => {
  return <ActionWrapper {...props} ui={Button} />
}

export type ActionTooltipProps = Omit<ActionWrapperProps<TooltipProps>, 'ui'>
export const ActionTooltip: FC<ActionTooltipProps> = props => {
  return <ActionWrapper {...props} ui={Tooltip} />
}

export type ActionStackProps = Omit<ActionWrapperProps<StackProps>, 'ui'>
export const ActionStack: FC<ActionStackProps> = props => {
  return <ActionWrapper {...props} ui={Stack} />
}

export const ActionHStack: FC<ActionStackProps> = props => {
  return <ActionWrapper {...props} ui={HStack} />
}
