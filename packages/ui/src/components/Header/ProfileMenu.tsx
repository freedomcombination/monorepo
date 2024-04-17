import { FC, Fragment } from 'react'

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
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FiLogIn, FiLogOut } from 'react-icons/fi'

import { useAuthContext } from '@fc/context'
import { getMediaUrl } from '@fc/utils'

import { ProfileMenuProps } from './types'
import { useScroll } from '../../hooks'
import { Navigate } from '../Navigate'

export const ProfileMenu: FC<ProfileMenuProps> = ({ isDark, isLoggedIn }) => {
  const isScrolled = useScroll()
  const { t } = useTranslation()
  const { user, profile, logout, isLoading } = useAuthContext()
  const { asPath } = useRouter()
  const loginHref = `/login?returnUrl=${asPath}`

  const Wrapper = !isScrolled && isDark ? DarkMode : Fragment

  if (!isLoggedIn) {
    return (
      <Wrapper>
        <Link href={loginHref} className="login-link">
          <Button
            size="sm"
            isLoading={isLoading}
            variant={!isScrolled && isDark ? 'solid' : 'outline'}
            rightIcon={<FiLogIn />}
          >
            {t('login.signin')}
          </Button>
        </Link>
      </Wrapper>
    )
  }

  return (
    <Menu placement="bottom">
      <MenuButton
        as={Button}
        size={'sm'}
        leftIcon={
          <Avatar
            size={'xs'}
            bg={'white'}
            src={getMediaUrl(profile?.avatar)}
            name={profile?.name || user?.username}
          />
        }
      >
        {profile?.name || user?.username}
      </MenuButton>
      <MenuList>
        <MenuItem as={Navigate} href={'/profile'}>
          {t('profile')}
        </MenuItem>

        <MenuDivider />
        <MenuItem icon={<FiLogOut />} color="red.400" onClick={logout}>
          {t('logout')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
