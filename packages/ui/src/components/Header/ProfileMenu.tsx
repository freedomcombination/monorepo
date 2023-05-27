import { FC } from 'react'

import {
  Avatar,
  Button,
  DarkMode,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FiLogIn, FiLogOut } from 'react-icons/fi'

import { ASSETS_URL } from '@wsvvrijheid/config'
import { useAuthContext } from '@wsvvrijheid/context'

import { ProfileMenuProps } from './types'
import { useScroll } from '../../hooks'
import { Navigate } from '../Navigate'

export const ProfileMenu: FC<ProfileMenuProps> = ({ isDark, menu }) => {
  const isScrolled = useScroll()
  const router = useRouter()
  const { t } = useTranslation()
  const { user, isLoggedIn, logout } = useAuthContext()

  const handleLogout = async () => {
    await logout()
    console.log('Destroyed auth')

    router.push('/login')
  }

  if (!isLoggedIn)
    return !isScrolled && isDark ? (
      <DarkMode>
        <Button
          as={Navigate}
          href="/login"
          size="sm"
          variant={!isScrolled && isDark ? 'solid' : 'outline'}
          rightIcon={<FiLogIn />}
        >
          {t('login.sign-in')}
        </Button>
      </DarkMode>
    ) : (
      <Button
        as={Navigate}
        href="/login"
        size="sm"
        variant={!isScrolled && isDark ? 'solid' : 'outline'}
        rightIcon={<FiLogIn />}
      >
        {t('login.sign-in')}
      </Button>
    )

  return (
    <Menu placement="bottom">
      <MenuButton>
        <Avatar
          boxSize={{ base: 10, lg: 12 }}
          src={`${ASSETS_URL}${user?.avatar}`}
          name={user?.name || user?.username}
        />
      </MenuButton>
      <MenuList>
        {menu.map(item => (
          <MenuItem
            key={item.link}
            as={Navigate}
            icon={item.icon}
            href={item.link}
          >
            {item.label}
          </MenuItem>
        ))}

        <MenuDivider />
        <MenuItem icon={<FiLogOut />} color="red.400" onClick={handleLogout}>
          {t('profile.logout')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
