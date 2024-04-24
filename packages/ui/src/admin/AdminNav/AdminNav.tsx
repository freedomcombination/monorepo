import { FC } from 'react'

import { Stack } from '@chakra-ui/react'

import { AdminNavItem } from './AdminNavItem'
import { AdminNavProps } from './types'
import { useAdminNav } from './useAdminNav'

export const AdminNav: FC<AdminNavProps> = ({ mobile }) => {
  const navItems = useAdminNav()

  return (
    <Stack spacing={0}>
      {navItems.map((item, index) => {
        return (
          <AdminNavItem
            icon={item.icon}
            key={index}
            label={item.label}
            link={item.link}
            submenu={item.submenu}
            mobile={mobile}
          />
        )
      })}
    </Stack>
  )
}

AdminNav.displayName = 'AdminNav'
