import {
  Box,
  Center,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaPaintBrush } from 'react-icons/fa'
import { FaSpinner } from 'react-icons/fa6'
import { MdRemoveModerator } from 'react-icons/md'

import { RecaptchaKeys } from '@fc/config/constants'
import { useArtsByArtist } from '@fc/services/art/getArtsByArtist'
import { useRecaptchaToken } from '@fc/services/common/useRecaptchaToken'

import { ArtGrid } from '../ArtGrid'
import { CreateArtForm } from '../CreateArtForm'

export const ArtsTab = () => {
  const { t } = useTranslation('common')

  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.LIKE_ART)

  // TODO: Remove like action from profile, user shouldn't like their own arts
  const { data, refetch } = useArtsByArtist(true)
  const rejected = data?.filter(art => art?.approvalStatus === 'rejected')
  const approved = data?.filter(art => art?.approvalStatus === 'approved')
  const pending = data?.filter(art => art?.approvalStatus === 'pending')
  const noContent = (
    <Center flex={1} width={'100%'} height={120} fontWeight={600}>
      No Content
    </Center>
  )
  const artPanelData = [approved, pending, rejected]

  const defaultIndex = approved?.length ? 0 : pending?.length ? 1 : 2

  if (!data?.length) return null

  return (
    <Stack>
      <Tabs isLazy colorScheme="primary" defaultIndex={defaultIndex}>
        <HStack spacing={4}>
          <TabList overscrollX={'auto'}>
            <CreateArtForm size="md" />

            <Tab
              data-testid="tab-approved"
              fontWeight={600}
              isDisabled={!approved?.length}
            >
              <Box as={FaPaintBrush} mr={1} /> <>{t('profile.approved-arts')}</>
            </Tab>
            <Tab
              data-testid="tab-pending"
              fontWeight={600}
              isDisabled={!pending?.length}
            >
              <Box as={FaSpinner} mr={1} /> <>{t('pending-arts')}</>
            </Tab>
            <Tab
              data-testid="tab-rejected"
              fontWeight={600}
              isDisabled={!rejected?.length}
            >
              <Box as={MdRemoveModerator} mr={1} /> <>{t('rejected-arts')}</>
            </Tab>
          </TabList>
        </HStack>

        <TabPanels>
          {artPanelData.map((artData, index) => (
            <TabPanel key={index} px={0}>
              {artData && artData.length > 0 ? (
                <ArtGrid
                  arts={artData}
                  refetch={refetch}
                  recaptchaToken={recaptchaToken}
                  columns={{ lg: 2, xl: 3 }}
                  isModal
                />
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
