import { Box, Center, HStack, Stack, Tabs } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaPaintBrush } from 'react-icons/fa'
import { FaSpinner } from 'react-icons/fa6'
import { MdRemoveModerator } from 'react-icons/md'

import { RecaptchaKeys } from '@fc/config'
import { useProfileArts, useRecaptchaToken } from '@fc/services'

import { ArtGrid } from '../ArtGrid'
import { CreateArtForm } from '../CreateArtForm'

export const ArtsTab = () => {
  const { t } = useTranslation('common')

  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.LIKE_ART)

  // TODO: Remove like action from profile, user shouldn't like their own arts
  const { data, refetch } = useProfileArts(true)
  const rejected = data?.filter(art => art?.approvalStatus === 'rejected')
  const approved = data?.filter(art => art?.approvalStatus === 'approved')
  const pending = data?.filter(art => art?.approvalStatus === 'pending')
  const noContent = (
    <Center flex={1} width={'100%'} height={120} fontWeight={600}>
      No Content
    </Center>
  )
  const artPanelData = [approved, pending, rejected]

  const defaultValue = approved?.length
    ? 'approved'
    : pending?.length
      ? 'pending'
      : 'rejected'

  if (!data?.length) return null

  return (
    <Stack>
      <Tabs.Root lazyMount colorScheme="primary" defaultValue={defaultValue}>
        <HStack gap={4}>
          <Tabs.List overscrollX={'auto'}>
            <CreateArtForm size="md" />

            <Tabs.Trigger
              data-testid="tab-approved"
              value="approved"
              fontWeight={600}
              disabled={!approved?.length}
            >
              <Box as={FaPaintBrush} mr={1} /> <>{t('profile.approved-arts')}</>
            </Tabs.Trigger>
            <Tabs.Trigger
              data-testid="tab-pending"
              value="pending"
              fontWeight={600}
              disabled={!pending?.length}
            >
              <Box as={FaSpinner} mr={1} /> <>{t('pending-arts')}</>
            </Tabs.Trigger>
            <Tabs.Trigger
              data-testid="tab-rejected"
              value="rejected"
              fontWeight={600}
              disabled={!rejected?.length}
            >
              <Box as={MdRemoveModerator} mr={1} /> <>{t('rejected-arts')}</>
            </Tabs.Trigger>
          </Tabs.List>
        </HStack>

        <Tabs.ContentGroup>
          {artPanelData.map((artData, index) => (
            <Tabs.Content
              value={artData?.[index].approvalStatus || 'approved'}
              key={index}
              px={0}
            >
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
            </Tabs.Content>
          ))}
        </Tabs.ContentGroup>
      </Tabs.Root>
    </Stack>
  )
}
