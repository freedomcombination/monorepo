'use client'
import { FC, PropsWithChildren } from 'react'

import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
  TabsProps,
  Text,
  VStack,
  useBreakpointValue,
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

const CustomTab = (props: TabProps) => (
  <Tab
    borderWidth={1}
    rounded={'md'}
    borderColor={'transparent'}
    _selected={{ borderColor: 'primary.500', color: 'primary.500' }}
    fontWeight={600}
    justifyContent={{ base: 'center', lg: 'start' }}
    w={'full'}
    {...props}
  />
)

export const ProfilePanel: FC<ProfilePanelProps> = ({
  children,
  showArts = false,
}) => {
  const { user, profile } = useAuthContext()
  const orientation = useBreakpointValue<TabsProps['orientation']>({
    base: 'horizontal',
    lg: 'vertical',
  })
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

      <Box bg="white" py={8} px={{ lg: 8 }}>
        <Container>
          <Tabs
            orientation={orientation}
            border={0}
            colorScheme="primary"
            size="lg"
            variant={'unstyled'}
            gap={8}
          >
            <TabList
              border={0}
              minW={{ base: 'auto', lg: 300 }}
              mb={{ base: 8, lg: 0 }}
              h="max-content"
              overflowX={'auto'}
            >
              <CustomTab>
                <Box as={FaUserCircle} mr={2} />
                <Box>{t('profile.tabs.profile')}</Box>
              </CustomTab>
              <CustomTab>
                <Box as={FaKey} mr={2} />
                <Box>{t('profile.tabs.security')}</Box>
              </CustomTab>
              <CustomTab>
                <Box as={TbSocial} mr={2} />
                <Box>{t('profile.tabs.socials')}</Box>
              </CustomTab>
              {showArts && (
                <CustomTab>
                  <Box as={FaPaintBrush} mr={2} />
                  <Box>{t('profile.tabs.arts')}</Box>
                </CustomTab>
              )}
            </TabList>
            <TabPanels>
              <TabPanel p={0}>
                <DetailsTab />
              </TabPanel>
              <TabPanel p={0}>
                <SecurityTab />
              </TabPanel>
              <TabPanel p={0}>
                <Socials />
              </TabPanel>
              {showArts && (
                <TabPanel p={0}>
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
