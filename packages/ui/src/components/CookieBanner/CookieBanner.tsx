import Link from 'next/link'
import { Center, Icon, Square, Stack, StackProps, Text } from '@chakra-ui/react'
import { Trans, useTranslation } from 'next-i18next'
import { BiCookie } from 'react-icons/bi'

import { Button } from '@fc/chakra'

type CookieBannerProps = StackProps & {
  onAllow?: () => void
}

const CookieBanner = (props: CookieBannerProps) => {
  const { onAllow } = props
  const { t } = useTranslation()

  return (
    <Stack
      justify={'center'}
      align={'center'}
      gap={4}
      p="4"
      direction={{ base: 'column', sm: 'row' }}
      bg="gray.900"
      rounded={'md'}
      boxShadow="sm"
      position="fixed"
      bottom="2"
      right="2"
      left="2"
    >
      <Square
        display={{ base: 'none', md: 'block' }}
        size="12"
        borderRadius="md"
      >
        <Center w="43px" h="43px">
          <Icon as={BiCookie} boxSize="6" color={'primary.300'} />
        </Center>
      </Square>

      <Text color="white" fontSize={{ base: 'sm', md: 'md' }}>
        <Trans
          i18nKey={'cookie.text'}
          components={{
            a: <Link color={'primary.300'} href="/privacy" />,
          }}
        />
      </Text>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: '3', sm: '2' }}
        align={{ base: 'stretch', sm: 'center' }}
        width={{ base: 'full', sm: 'auto' }}
      >
        <Button size="sm" flexShrink={0} onClick={onAllow}>
          {t('allow')}
        </Button>
      </Stack>
    </Stack>
  )
}

export default CookieBanner
