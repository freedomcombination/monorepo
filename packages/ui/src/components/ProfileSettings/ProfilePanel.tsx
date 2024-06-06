'use client'
import { FC, PropsWithChildren } from 'react'

import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaPaintBrush, FaUserCircle } from 'react-icons/fa'
import { FaKey } from 'react-icons/fa6'
import { TbSocial } from 'react-icons/tb'

import { useAuthContext } from '@fc/context'

import { ArtsTab } from './ArtsTab'
import { DetailsTab } from './DetailsTab'
import { SecurityTab } from './SecurityTab'
import { Socials } from './SocialsTab'
import { Container } from '../Container'
import { Hero } from '../Hero'
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
          <Box
            color={'white'}
            fontSize={'lg'}
            textTransform={'capitalize'}
            textAlign={'center'}
            fontWeight={600}
          >
            <Text>{profile?.name || user?.username}</Text>
            <Text>{user.roles.join(', ')}</Text>
          </Box>
        </VStack>
      </Hero>

      <Box bg="white" p={8}>
        <Container>
          <Tabs
            orientation="vertical"
            border={0}
            colorScheme="primary"
            size="lg"
          >
            <TabList border={0} minW={300} h="max-content">
              <Tab fontWeight={600} justifyContent={'start'}>
                <Box as={FaUserCircle} mr={2} /> {t('profile.tabs.profile')}
              </Tab>
              <Tab fontWeight={600} justifyContent={'start'}>
                <Box as={FaKey} mr={2} /> {t('profile.tabs.security')}
              </Tab>
              <Tab fontWeight={600} justifyContent={'start'}>
                <Box as={TbSocial} mr={2} /> {t('profile.tabs.socials')}
              </Tab>
              {showArts && (
                <Tab fontWeight={600} justifyContent={'start'}>
                  <Box as={FaPaintBrush} mr={2} /> {t('profile.tabs.arts')}
                </Tab>
              )}
            </TabList>
            <TabPanels>
              <TabPanel>
                <DetailsTab />
              </TabPanel>
              <TabPanel>
                <SecurityTab />
              </TabPanel>
              <TabPanel>
                <Socials />
              </TabPanel>
              {showArts && (
                <TabPanel>
                  <ArtsTab />
                </TabPanel>
              )}
            </TabPanels>
            {children}
          </Tabs>
        </Container>
      </Box>
    </>
  )
}
