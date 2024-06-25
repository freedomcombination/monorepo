import { FC } from 'react'

import { Badge, BadgeProps, HStack } from '@chakra-ui/react'

import { StrapiLocale } from '@fc/types'

type LocaleBadgesProps = {
  locales: StrapiLocale[]
} & BadgeProps

export const LocaleBadges: FC<LocaleBadgesProps> = ({ locales, ...rest }) => {
  const colorScheme = {
    en: 'purple',
    nl: 'orange',
    tr: 'cyan',
  }

  return (
    <HStack spacing={1}>
      {locales.map((locale, i) => (
        <Badge
          key={i}
          variant="outline"
          {...rest}
          textTransform="uppercase"
          colorScheme={colorScheme[locale]}
        >
          {locale}
        </Badge>
      ))}
    </HStack>
  )
}
