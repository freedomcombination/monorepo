import { FC } from 'react'

import { Badge, BadgeProps, HStack } from '@chakra-ui/react'

import { StrapiLocale } from '@fc/types'

type LocaleBadgesProps = {
  locales: StrapiLocale[]
} & BadgeProps

export const LocaleBadges: FC<LocaleBadgesProps> = ({ locales, ...rest }) => {
  const colorPalette = {
    en: 'purple',
    nl: 'orange',
    tr: 'cyan',
  }

  return (
    <HStack gap={1}>
      {locales.map((locale, i) => (
        <Badge
          key={i}
          variant="outline"
          {...rest}
          textTransform="uppercase"
          colorPalette={colorPalette[locale]}
        >
          {locale}
        </Badge>
      ))}
    </HStack>
  )
}
