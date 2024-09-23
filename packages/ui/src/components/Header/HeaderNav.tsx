import { FC } from 'react'

import { Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { HeaderNavItem } from './HeaderNavItem'
import { HeaderNavProps } from './types'
import { useScroll } from '../../hooks'
import { ButtonLink } from '../ButtonLink'

export const HeaderNav: FC<HeaderNavProps> = ({
  direction = 'row',
  menu,
  isDark,
}) => {
  const { t } = useTranslation()
  const isScrolled = useScroll()

  return (
    <Stack direction={direction} align={'center'}>
      {menu.map((item, i) => {
        return <HeaderNavItem key={i} item={item} isDark={isDark} />
      })}

      <ButtonLink
        href={'/donation'}
        variant={'outline'}
        data-testid={'link-d/donation'}
        size={'sm'}
        color={isDark && !isScrolled ? 'whiteAlpha.900' : 'gray.700'}
        borderColor={isDark && !isScrolled ? 'whiteAlpha.900' : 'gray.700'}
        fontWeight={600}
        borderWidth={2}
      >
        {t('donation.title')}
      </ButtonLink>
    </Stack>
  )
}
