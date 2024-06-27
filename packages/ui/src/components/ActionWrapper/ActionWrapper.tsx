import { ReactElement } from 'react'

import { ChakraProps } from '@chakra-ui/react'

import { useAuthContext } from '@fc/context'

import { ActionWrapperProps } from './types'

export const ActionWrapper = <T extends ChakraProps>(
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
