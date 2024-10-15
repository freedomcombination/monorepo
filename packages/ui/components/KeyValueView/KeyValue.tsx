import { FC, ReactNode } from 'react'

import { HStack, Stack, StackProps, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { I18nNamespaces } from '../../@types/i18next'

type KeyValueProps = {
  when?: boolean
  stripped?: boolean
  divider?: boolean
} & Omit<StackProps, 'title' | 'divider'> &
  (
    | {
        title: ReactNode
      }
    | {
        tKey: keyof I18nNamespaces['common']
      }
  )

export const KeyValue: FC<KeyValueProps> = ({
  children,
  stripped = false,
  when = true,
  divider = true,
  ...props
}) => {
  const { t } = useTranslation()
  if (!when) return null

  const { title, restProp } =
    'tKey' in props
      ? { title: t(props.tKey), restProp: { ...props, tKey: undefined } }
      : { title: props.title, restProp: { ...props, title: undefined } }

  return (
    <HStack
      fontSize={'sm'}
      gap={4}
      p={1}
      {...(stripped ? { bg: 'gray.100' } : {})}
      {...(!stripped && divider
        ? { borderBottomWidth: 1, borderBottomColor: 'gray.100' }
        : {})}
      {...restProp}
    >
      <Text width={'120px'} textAlign={'right'} flexShrink={0}>
        {title}
      </Text>
      {typeof children === 'string' ? (
        <Text>{children}</Text>
      ) : (
        <Stack>{children}</Stack>
      )}
    </HStack>
  )
}
