'use client'
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react'

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
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaPaintBrush, FaUserCircle } from 'react-icons/fa'
import { FaBlog, FaKey } from 'react-icons/fa6'
import { MdOutlinePayments } from 'react-icons/md'
import { TbSocial } from 'react-icons/tb'

import { useAuthContext } from '@fc/context'

import { ArtsTab } from './ArtsTab'
import { BlogsTab } from './BlogsTab'
import { CoursesTab } from './CoursesTab'
import { DetailsTab } from './DetailsTab'
import { SecurityTab } from './SecurityTab'
import { Socials } from './SocialsTab'
import { Container } from '../Container'
import { Hero } from '../Hero'
import { WAvatar } from '../WAvatar'

type ProfilePanelProps = PropsWithChildren<{
  showArts?: boolean
}>

const CustomTab: FC<{ title: string } & TabProps> = ({ title, ...props }) => {
  return (
    <Tab
      borderWidth={1}
      rounded={'md'}
      title={title}
      borderColor={'transparent'}
      _selected={{ borderColor: 'primary.500', color: 'primary.500' }}
      fontWeight={600}
      justifyContent={{ base: 'center', lg: 'start' }}
      w={'full'}
      {...props}
    />
  )
}

const findTabIndexByTitle = (
  tabList: HTMLDivElement | null,
  title: string,
): number => {
  if (!tabList) return 0

  const tabs = Array.from(tabList.children)
  const index = tabs.findIndex(
    child => (child as unknown as { title: string }).title === title,
  )

  return index === -1 ? 0 : index
}

export const ProfilePanel: FC<ProfilePanelProps> = ({
  children,
  showArts = false,
}) => {
  const { user, profile, site } = useAuthContext()
  const orientation = useBreakpointValue<TabsProps['orientation']>({
    base: 'horizontal',
    lg: 'vertical',
  })
  const { t } = useTranslation()

  const router = useRouter()
  const activeTab = (router.query.tab as string) ?? 'profile'
  const tabListRef = useRef<HTMLDivElement>(null)
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const isBlogsVisible =
    (site === 'dashboard' || site === 'foundation') &&
    (user?.roles.includes('admin') || user?.roles.includes('author'))

  const isCoursePaymentVisible =
    (site === 'foundation' || site === 'dashboard') &&
    process.env.NODE_ENV === 'development'

  useEffect(() => {
    const index = findTabIndexByTitle(
      tabListRef.current,
      activeTab.toLowerCase(),
    )
    setActiveTabIndex(index)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, tabListRef.current])

  const updateSelectedTab = (index: number) => {
    setActiveTabIndex(index)
    const tabList = Array.from(tabListRef.current?.children || [])
    const title = (tabList[index] as unknown as { title: string }).title

    router.push(`/profile?tab=${title}`)
  }

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
            index={activeTabIndex}
            onChange={updateSelectedTab}
            size="lg"
            variant={'unstyled'}
            gap={8}
            isLazy
          >
            <TabList
              border={0}
              minW={{ base: 'auto', lg: 300 }}
              mb={{ base: 8, lg: 0 }}
              h="max-content"
              ref={tabListRef}
              overflowX={'auto'}
            >
              <CustomTab title={'profile'}>
                <Box as={FaUserCircle} mr={2} />
                <Box>{t('profile.tabs.profile')}</Box>
              </CustomTab>
              <CustomTab title={'security'}>
                <Box as={FaKey} mr={2} />
                <Box>{t('profile.tabs.security')}</Box>
              </CustomTab>
              <CustomTab title={'socials'}>
                <Box as={TbSocial} mr={2} />
                <Box>{t('profile.tabs.socials')}</Box>
              </CustomTab>
              {isCoursePaymentVisible && (
                <CustomTab title={'courses'}>
                  <Box as={MdOutlinePayments} mr={2} />
                  <Box>{t('profile.tabs.courses')}</Box>
                </CustomTab>
              )}
              {showArts && (
                <CustomTab title={'arts'}>
                  <Box as={FaPaintBrush} mr={2} />
                  <Box>{t('profile.tabs.arts')}</Box>
                </CustomTab>
              )}
              {isBlogsVisible && (
                <CustomTab title={'blogs'}>
                  <Box as={FaBlog} mr={2} />
                  <Box>{t('profile.tabs.blogs')}</Box>
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
              {isCoursePaymentVisible && (
                <TabPanel p={0}>
                  <CoursesTab />
                </TabPanel>
              )}
              {showArts && (
                <TabPanel p={0}>
                  <ArtsTab />
                </TabPanel>
              )}
              {isBlogsVisible && (
                <TabPanel p={0}>
                  <BlogsTab />
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
