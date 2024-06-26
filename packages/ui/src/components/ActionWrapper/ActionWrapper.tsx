import { FC, ReactElement } from 'react'

import { Button, ChakraProps, HStack, Stack, Tooltip } from '@chakra-ui/react'

import { useAuthContext } from '@fc/context'
import {
  ActionButtonProps,
  ActionStackProps,
  ActionTooltipProps,
  ActionWrapperProps,
} from './types'

const ActionWrapper = <T extends ChakraProps>(
  props: ActionWrapperProps<T>,
): ReactElement<T> | null => {
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

export const ActionButton: FC<ActionButtonProps> = props => {
  return <ActionWrapper {...props} ui={Button} />
}

export const ActionTooltip: FC<ActionTooltipProps> = props => {
  return <ActionWrapper {...props} ui={Tooltip} />
}

export const ActionStack: FC<ActionStackProps> = props => {
  return <ActionWrapper {...props} ui={Stack} />
}

export const ActionHStack: FC<ActionStackProps> = props => {
  return <ActionWrapper {...props} ui={HStack} />
}
