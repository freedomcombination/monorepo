import {
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'
import { FaKey } from 'react-icons/fa6'

import { useAuthContext } from '@fc/context'
import { SimpleRole } from '@fc/types'

import { PermissionCard } from './PermissionCard'

export const DevPermissionPopup = () => {
  const { permissions, setPermissions } = useAuthContext()

  const setDevPermissions = (role: SimpleRole) => {
    setPermissions(role.permissions)
  }

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
        />
      </PopoverContent>
    </Popover>
  )
}
