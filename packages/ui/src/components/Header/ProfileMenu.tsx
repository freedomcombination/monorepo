import { FC } from 'react'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FiLogIn, FiLogOut } from 'react-icons/fi'

import {
  Button,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from '@fc/chakra'
import { useAuthContext } from '@fc/context'

import { ProfileMenuProps } from './types'
import { useScroll } from '../../hooks'
import { ButtonLink } from '../ButtonLink'
import { WAvatar } from '../WAvatar'

export const ProfileMenu: FC<ProfileMenuProps> = ({ isDark, isLoggedIn }) => {
  const isScrolled = useScroll()
  const { t } = useTranslation()
  const { user, profile, logout, loading } = useAuthContext()
  const { asPath } = useRouter()
  const loginHref = `/auth/login?returnUrl=${asPath}`

  if (!isLoggedIn) {
    return (
      <ButtonLink
        href={loginHref}
        size="sm"
        loading={loading}
        variant={!isScrolled && isDark ? 'solid' : 'outline'}
        rightIcon={<FiLogIn />}
      >
        {t('login.signin')}
      </ButtonLink>
    )
  }

  return (
    <MenuRoot positioning={{ placement: 'bottom' }}>
      <MenuTrigger value="profile-menu" asChild>
        <Button
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
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="profile" asChild>
          <ButtonLink href={'/profile'}>{t('profile')}</ButtonLink>
        </MenuItem>

        <MenuSeparator />
        <MenuItem value="logout">
          <Button leftIcon={<FiLogOut />} color="red.400" onClick={logout}>
            {t('logout')}
          </Button>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}
