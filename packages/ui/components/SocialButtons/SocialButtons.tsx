import { FC } from 'react'

import { HStack, IconButton } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import type { Localize } from '@fc/types'

import { SocialButtonsProps } from './types'

export const SocialButtons: FC<SocialButtonsProps> = ({ items, ...rest }) => {
  const { locale } = useRouter()

  return (
    <HStack align="start">
      {items?.map((item, i) => {
        const link = (item?.link as Localize<string>)?.[locale] || item.link

        return (
          <IconButton
            key={i}
            aria-label={item.label}
            as="a"
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
            icon={<item.icon />}
            href={link}
            variant="outline"
            colorScheme="primary"
            borderColor="primary.100"
            color="primary.100"
            _hover={{
              bg: 'whiteAlpha.100',
              borderColor: 'primary.50',
              color: 'primary.50',
            }}
            {...rest}
          />
        )
      })}
    </HStack>
  )
}
