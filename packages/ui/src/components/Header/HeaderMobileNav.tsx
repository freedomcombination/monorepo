import { FC } from 'react'

import { Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { HeaderMobileNavItem } from './HeaderMobileNavItem'
import { HeaderMobileNavProps } from './types'
import { ButtonLink } from '../ButtonLink'

export const HeaderMobileNav: FC<HeaderMobileNavProps> = ({ headerMenu }) => {
  const { t } = useTranslation()

  return (
    <Stack spacing={0}>
      {headerMenu.map((item, i) => {
        return <HeaderMobileNavItem key={i} item={item} />
      })}

      <ButtonLink
        href={'/donation'}
        w={'full'}
        data-testid="link-mobile-donation"
      >
        {t('donation.title')}
      </ButtonLink>
    </Stack>
  )
}
