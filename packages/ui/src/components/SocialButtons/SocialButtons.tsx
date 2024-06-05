import { FC } from 'react'

import { HStack, IconButton, IconButtonProps } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { IconType } from 'react-icons/lib'

import { Localize } from '@fc/types'

export type SocialItem = {
  label: string
  icon: IconType
  link: Localize<string> | string
}

export type SocialButtonsProps = Omit<IconButtonProps, 'aria-label'> & {
  items: SocialItem[]
}

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
