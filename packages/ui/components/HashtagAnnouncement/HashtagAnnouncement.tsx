import { FC } from 'react'

import { Heading, Stack, Text, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { SITE_URL } from '@fc/config/constants'
import { Caps } from '@fc/ui/components/Caps'
import { ShareButtons } from '@fc/ui/components/ShareButtons'
import { getItemLink } from '@fc/utils/getItemLink'
import { mapHashtagToOgParams } from '@fc/utils/mapHashtagToOgParams'

import { HashtagAnnouncementProps } from './types'

export const HashtagAnnouncement: FC<HashtagAnnouncementProps> = ({
  hashtag,
}) => {
  const { t } = useTranslation()

  const link = getItemLink(hashtag, 'hashtags') || ''

  const capsParams = mapHashtagToOgParams(hashtag)

  return (
    <Stack gap={8}>
      <Caps
        rounded={'lg'}
        overflow={'hidden'}
        w={'full'}
        shadow={'md'}
        imageParams={capsParams}
        hideLogo={true}
      />
      <Stack fontSize={'lg'} justify={'center'} gap={6}>
        <Heading as={'h3'}>{hashtag.title}</Heading>
        <Text>{t('support.hashtag')}</Text>
        <ChakraLink asChild fontWeight={'bold'} color={'primary.500'}>
          <Link href={link}>{t('join-link')}</Link>
        </ChakraLink>
        <ShareButtons
          size={'lg'}
          title={capsParams.title}
          url={`${SITE_URL}${link}`}
          quote={`${capsParams.text}\n\n ${t('support.hashtag')}\n\n`}
        />
      </Stack>
    </Stack>
  )
}
