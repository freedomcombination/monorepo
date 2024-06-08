import {
  Box,
  Center,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaPaintBrush } from 'react-icons/fa'
import { FaSpinner } from 'react-icons/fa6'
import { MdRemoveModerator } from 'react-icons/md'

import { RecaptchaKeys } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { useArtsByArtist, useRecaptchaToken } from '@fc/services'

import { ArtCard } from '../ArtCard'
import { CreateArtForm } from '../CreateArtForm'

export const ArtsTab = () => {
  const { t } = useTranslation('common')

  const { profile } = useAuthContext()
  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.LIKE_ART)

  // TODO: Remove like action from profile, user shouldn't like their own arts
  const { data, refetch } = useArtsByArtist(profile?.id, true)
  const rejected = data?.filter(art => art?.approvalStatus === 'rejected')
  const approved = data?.filter(art => art?.approvalStatus === 'approved')
  const pending = data?.filter(art => art?.approvalStatus === 'pending')
  const noContent = (
    <Center flex={1} width={'100%'} height={120} fontWeight={600}>
      No Content
    </Center>
  )
  const artPanelData = [approved, pending, rejected]

  return (
    <Stack>
      <Box>
        <CreateArtForm size="md" />
      </Box>
      <Tabs isLazy>
        <TabList overscrollX={'auto'}>
          <Tab fontWeight={600}>
            <Box as={FaPaintBrush} mr={1} /> <>{t('profile.approved-arts')}</>
          </Tab>
          <Tab fontWeight={600}>
            <Box as={FaSpinner} mr={1} /> <>{t('pending-arts')}</>
          </Tab>
          <Tab fontWeight={600}>
            <Box as={MdRemoveModerator} mr={1} /> <>{t('rejected-arts')}</>
          </Tab>
        </TabList>

        <TabPanels>
          {artPanelData.map((artData, index) => (
            <TabPanel key={index} px={0}>
              {artData && artData.length > 0 ? (
                <SimpleGrid m={4} gap={8} columns={{ base: 1, md: 2, lg: 4 }}>
                  {artData.map(art => (
                    <ArtCard
                      onToggleLike={refetch}
                      recaptchaToken={recaptchaToken}
                      key={art.id}
                      art={art}
                    />
                  ))}
                </SimpleGrid>
              ) : (
                noContent
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
