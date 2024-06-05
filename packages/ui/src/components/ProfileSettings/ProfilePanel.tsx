'use client'
import { FC, PropsWithChildren } from 'react'

import { Center, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaPaintBrush, FaUserCircle } from 'react-icons/fa'
import { FaKey } from 'react-icons/fa6'
import { TbSocial } from 'react-icons/tb'

import { useAuthContext } from '@fc/context'

import { Arts } from './AppSpecificTabs/Art'
import { Details } from './CommonTabs/Details'
import { Security } from './CommonTabs/Security'
import { Socials } from './CommonTabs/Socials'
import { Container } from '../Container'
import { Hero } from '../Hero'
import { HorizontalTabs, HorizontalTab } from '../HorizontalTabs'
import { WAvatar } from '../WAvatar'

type ProfilePanelProps = PropsWithChildren<{
  showArts?: boolean
}>

export const ProfilePanel: FC<ProfilePanelProps> = ({
  children,
  showArts = false,
}) => {
  const { user, profile } = useAuthContext()

  const { t } = useTranslation()

  if (!user) return <Hero></Hero>

  return (
    <>
      <Hero>
        <VStack>
          <WAvatar
            size="xl"
            src={profile?.avatar}
            name={profile?.name || user?.username}
            boxShadow={'2xl'}
          />
          <HStack
            justifyContent="center"
            alignItems={'center'}
            alignContent={'flex-end'}
            bg="transparent"
          >
            <Text color={'white'}>{profile?.name || user?.username}</Text>
          </HStack>
        </VStack>
        <Stack
          position={'absolute'}
          right={2}
          bottom={2}
          spacing={4}
          align={'flex-end'}
        >
          <Text color={'white'}>Role: {user.roles.join(', ')}</Text>
        </Stack>
      </Hero>

      <Container>
        <Center>
          <HorizontalTabs>
            <HorizontalTab
              title={t('profile.tabs.profile')}
              icon={<FaUserCircle />}
            >
              <Details />
            </HorizontalTab>
            <HorizontalTab title={t('profile.tabs.security')} icon={<FaKey />}>
              <Security />
            </HorizontalTab>
            <HorizontalTab
              title={t('profile.tabs.socials')}
              icon={<TbSocial />}
            >
              <Socials />
            </HorizontalTab>
            {showArts && (
              <HorizontalTab
                title={t('profile.tabs.arts')}
                icon={<FaPaintBrush />}
              >
                <Arts />
              </HorizontalTab>
            )}
            {children}
          </HorizontalTabs>
        </Center>
      </Container>
    </>
  )
}
