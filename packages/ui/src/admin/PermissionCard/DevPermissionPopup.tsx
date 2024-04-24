import {
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'
import { FaKey } from 'react-icons/fa6'

import { useAuthContext } from '@fc/context'
import { SimpleRole, StrapiEndpoint } from '@fc/types'
import { makeSingular } from '@fc/utils'

import { PermissionCard } from './PermissionCard'

export type DevPermissionPopupProps = {
  filtered?: StrapiEndpoint
}

export const DevPermissionPopup: React.FC<DevPermissionPopupProps> = ({
  filtered,
}) => {
  const { permissions, setPermissions } = useAuthContext()

  if (process.env.NODE_ENV !== 'development') return null

  const setDevPermissions = (role: SimpleRole) => {
    setPermissions(role.permissions)
  }

  const filters = filtered ? [makeSingular(filtered)] : undefined

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          aria-label="dev"
          icon={<FaKey />}
          rounded="full"
          variant={'outline'}
        />
      </PopoverTrigger>
      <PopoverContent width={'600px'}>
        <PermissionCard
          role={{ name: 'Developer', permissions } as SimpleRole}
          editable={true}
          setRole={setDevPermissions}
          filteredEndpoints={filters ?? []}
        />
      </PopoverContent>
    </Popover>
  )
}
