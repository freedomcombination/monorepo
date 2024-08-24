'use client'
import { FC, PropsWithChildren } from 'react'

import { Box, Tabs, Text, VStack, useBreakpointValue } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaPaintBrush, FaUserCircle } from 'react-icons/fa'
import { FaBlog, FaKey } from 'react-icons/fa6'
import { TbSocial } from 'react-icons/tb'

import { useAuthContext } from '@fc/context'

import { ArtsTab } from './ArtsTab'
import { BlogsTab } from './BlogsTab'
import { DetailsTab } from './DetailsTab'
import { SecurityTab } from './SecurityTab'
import { Socials } from './SocialsTab'
import { Container } from '../Container'
import { Hero } from '../Hero'
import { WAvatar } from '../WAvatar'

type ProfilePanelProps = PropsWithChildren<{
  showArts?: boolean
}>

const CustomTab = (props: Tabs.TriggerProps) => (
  <Tabs.Trigger
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
  const { user, profile, site } = useAuthContext()
  const orientation = useBreakpointValue<Tabs.RootProps['orientation']>({
    base: 'horizontal',
    lg: 'vertical',
  })
  const { t } = useTranslation()

  const isBlogsVisible =
    (site === 'dashboard' || site === 'foundation') &&
    (user?.roles.includes('admin') || user?.roles.includes('author'))

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
          <Tabs.Root
            orientation={orientation}
            border={0}
            colorScheme="primary"
            size="lg"
            variant={'plain'}
            gap={8}
            lazyMount
          >
            <Tabs.List
              border={0}
              minW={{ base: 'auto', lg: 300 }}
              mb={{ base: 8, lg: 0 }}
              h="max-content"
              overflowX={'auto'}
            >
              <CustomTab data-testid="tab-profile" value="profile">
                <Box as={FaUserCircle} mr={2} />
                <Box>{t('profile.tabs.profile')}</Box>
              </CustomTab>
              <CustomTab data-testid="tab-security" value="security">
                <Box as={FaKey} mr={2} />
                <Box>{t('profile.tabs.security')}</Box>
              </CustomTab>
              <CustomTab data-testid="tab-socials" value="socials">
                <Box as={TbSocial} mr={2} />
                <Box>{t('profile.tabs.socials')}</Box>
              </CustomTab>
              {showArts && (
                <CustomTab data-testid="tab-arts" value="arts">
                  <Box as={FaPaintBrush} mr={2} />
                  <Box>{t('profile.tabs.arts')}</Box>
                </CustomTab>
              )}
              {isBlogsVisible && (
                <CustomTab data-testid="tab-blogs" value="blogs">
                  <Box as={FaBlog} mr={2} />
                  <Box>{t('profile.tabs.blogs')}</Box>
                </CustomTab>
              )}
            </Tabs.List>
            <Tabs.ContentGroup>
              <Tabs.Content value="profile" p={0}>
                <DetailsTab />
              </Tabs.Content>
              <Tabs.Content value="security" p={0}>
                <SecurityTab />
              </Tabs.Content>
              <Tabs.Content value="socials" p={0}>
                <Socials />
              </Tabs.Content>
              {showArts && (
                <Tabs.Content value="arts" p={0}>
                  <ArtsTab />
                </Tabs.Content>
              )}
              {isBlogsVisible && (
                <Tabs.Content value="blogs" p={0}>
                  <BlogsTab />
                </Tabs.Content>
              )}
            </Tabs.ContentGroup>
            {children}
          </Tabs.Root>
        </Container>
      </Box>
    </>
  )
}
