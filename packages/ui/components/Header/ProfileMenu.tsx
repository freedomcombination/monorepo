import { FC, Fragment } from 'react'

import {
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

import { useAuthContext } from '@fc/context/auth'

import { ProfileMenuProps } from './types'
import { useScroll } from '../../hooks'
import { ButtonLink } from '../ButtonLink'
import { WAvatar } from '../WAvatar'

export const ProfileMenu: FC<ProfileMenuProps> = ({
  isDark,
  isLoggedIn,
  isMobile,
}) => {
  const isScrolled = useScroll()
  const { t } = useTranslation()
  const { user, profile, logout, isLoading } = useAuthContext()
  const { asPath } = useRouter()
  const loginHref = `/auth/login?returnUrl=${asPath}`

  const Wrapper = !isScrolled && isDark ? DarkMode : Fragment

  if (!isLoggedIn) {
    return (
      <Wrapper>
        <ButtonLink
          href={loginHref}
          data-testid={`link-${isMobile ? 'm' : 'd'}/login`}
          size="sm"
          isLoading={isLoading}
          variant={!isScrolled && isDark ? 'solid' : 'outline'}
          rightIcon={<FiLogIn />}
        >
          {t('login.signin')}
        </ButtonLink>
      </Wrapper>
    )
  }

  return (
    <Menu placement="bottom">
      <MenuButton
        data-testid={`button-${isMobile ? 'm' : 'd'}-profile-menu`}
        as={Button}
        size={'sm'}
        leftIcon={
          <WAvatar
            size={'xs'}
            src={profile?.avatar}
            name={profile?.name || user?.username}
          />
        }
      >
        {profile?.name || user?.username}
      </MenuButton>
      <MenuList>
        <MenuItem
          data-testid={`link-${isMobile ? 'm' : 'd'}/profile`}
          as={Link}
          href={'/profile'}
        >
          {t('profile')}
        </MenuItem>

        <MenuDivider />
        <MenuItem
          data-testid={`button-${isMobile ? 'm' : 'd'}-logout`}
          icon={<FiLogOut />}
          color="red.400"
          onClick={logout}
        >
          {t('logout')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
