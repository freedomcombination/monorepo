import { FC } from 'react'

import { Box, HStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaFacebook, FaGoogle, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import { API_URL } from '@fc/config'

import {
  SocialLoginButtonsProps,
  SocialProvider,
  SocialProviderName,
} from './types'
import { Button } from '../Button'

const loginProviders: SocialProvider[] = [
  {
    name: 'Google',
    icon: <Box as={FaGoogle} color="red.500" boxSize="5" />,
    url: '/api/connect/google',
    colorPalette: 'red',
  },
  {
    name: 'Facebook',
    icon: <Box as={FaFacebook} color="facebook.500" boxSize="5" />,
    url: '/api/connect/facebook',
    colorPalette: 'facebook',
  },
  {
    name: 'Twitter',
    icon: <Box as={FaXTwitter} color="black" boxSize="5" />,
    url: '/api/connect/twitter',
    colorPalette: 'twitter',
  },
  {
    name: 'Instagram',
    icon: <Box as={FaInstagram} color="purple.500" boxSize="5" />,
    url: '/api/connect/instagram',
    colorPalette: 'purple',
  },
]

export const SocialLoginButtons: FC<SocialLoginButtonsProps> = ({
  providersToBeShown = [],
  ...rest
}) => {
  const { t } = useTranslation()

  if (!providersToBeShown.length) {
    return null
  }

  const onSocialLogin = async (url: string) => {
    window.open(`${API_URL}${url}`, '_self')
  }

  const providers = loginProviders.filter(provider =>
    providersToBeShown.includes(
      provider.name.toLowerCase() as SocialProviderName,
    ),
  )

  return (
    <HStack gap="4" width="full">
      {providers.map(({ name, icon, url, colorPalette }) => (
        <Button
          key={name}
          variant="outline"
          w="full"
          leftIcon={icon}
          colorPalette={colorPalette}
          {...rest}
          onClick={() => {
            onSocialLogin(url)
          }}
        >
          {t('login.sign-with', { provider: name })}
        </Button>
      ))}
    </HStack>
  )
}
