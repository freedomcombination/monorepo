import {
  Box,
  HStack,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaPaintBrush, FaSpinner } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { MdRemoveModerator } from 'react-icons/md'

import { useAuthContext } from '@fc/context'
import { useArtsByArtist, useRecaptchaToken } from '@fc/services'
import { getMediaUrl } from '@fc/utils'

import { ArtCard } from '../ArtCard'
import { Container } from '../Container'
import { CreateArtForm } from '../CreateArtForm'
import { Hero } from '../Hero'
import { WAvatar } from '../WAvatar'

const Settings = () => {
  const { user } = useAuthContext()

  return (
    <Stack>
      <Text>Username: {user?.username}</Text>
      <Text>Email: {user?.email}</Text>
    </Stack>
  )
}

export const AuthenticatedUserProfile = () => {
  const { t } = useTranslation('common')

  const { user, profile } = useAuthContext()
  const recaptchaToken = useRecaptchaToken('like_art')

  // TODO: Remove like action from profile, user shouldn't like their own arts
  const { data, refetch } = useArtsByArtist(profile?.id, true)
  const rejected = data?.filter(art => art?.approvalStatus === 'rejected')
  const approved = data?.filter(art => art?.approvalStatus === 'approved')
  const pending = data?.filter(art => art?.approvalStatus === 'pending')

  return (
    <>
      <Hero>
        <Stack>
          <WAvatar
            size="lg"
            src={getMediaUrl(profile?.avatar)}
            name={user?.username}
          />
          <HStack
            justifyContent="center"
            alignItems={'center'}
            alignContent={'flex-end'}
            bg="transparent"
          >
            <Text color={'white'}>{profile?.name || user?.username}</Text>
          </HStack>
        </Stack>
      </Hero>
      <Container>
        <Tabs isLazy my={4}>
          <Box overflowX="auto">
            <TabList overflowX="auto" minW="max-content" w="full">
              {user && (
                <>
                  <Tab fontWeight={600}>
                    <Box as={FaPaintBrush} mr={1} />{' '}
                    <>{t('profile.approved-arts')}</>
                  </Tab>
                  <Tab fontWeight={600}>
                    <Box as={FaSpinner} mr={1} /> <>{t('pending-arts')}</>
                  </Tab>
                  <Tab fontWeight={600}>
                    <Box as={MdRemoveModerator} mr={1} />{' '}
                    <>{t('rejected-arts')}</>
                  </Tab>
                </>
              )}
              <Tab ml="auto" fontWeight={600}>
                <Box as={IoMdSettings} mr={1} />{' '}
                <>{t('profile.general-settings')}</>
              </Tab>
              <Box my={1} ml={2}>
                <CreateArtForm />
              </Box>
            </TabList>
          </Box>
          <TabPanels>
            {/* Approved arts */}
            <TabPanel px={0}>
              <SimpleGrid m={4} gap={8} columns={{ base: 1, md: 2, lg: 4 }}>
                {approved?.map(art => (
                  <ArtCard
                    onToggleLike={refetch}
                    recaptchaToken={recaptchaToken}
                    key={art.id}
                    art={art}
                  />
                ))}
              </SimpleGrid>
            </TabPanel>
            {/* Pending arts */}
            <TabPanel px={0}>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={4}>
                {pending?.map(art => {
                  return (
                    <ArtCard
                      onToggleLike={refetch}
                      recaptchaToken={recaptchaToken}
                      key={art.id}
                      art={art}
                    />
                  )
                })}
              </SimpleGrid>
            </TabPanel>
            {/* rejected arts */}
            <TabPanel>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={4}>
                {rejected?.map(art => {
                  return (
                    <ArtCard
                      onToggleLike={refetch}
                      recaptchaToken={recaptchaToken}
                      key={art.id}
                      art={art}
                    />
                  )
                })}
              </SimpleGrid>
            </TabPanel>
            {/* general Settings */}
            <TabPanel>
              <Settings />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  )
}
