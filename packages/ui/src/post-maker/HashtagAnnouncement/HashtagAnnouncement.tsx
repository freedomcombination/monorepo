import { FC } from 'react'

import { Heading, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { SITE_URL } from '@fc/config'
import { Caps, Navigate, ShareButtons } from '@fc/ui'
import { getItemLink, mapHashtagToOgParams } from '@fc/utils'

import { HashtagAnnouncementProps } from './types'

export const HashtagAnnouncement: FC<HashtagAnnouncementProps> = ({
  hashtag,
}) => {
  const { t } = useTranslation()

  const link = getItemLink(hashtag, 'hashtags') || ''

  const capsParams = mapHashtagToOgParams(hashtag)

  return (
    <Stack spacing={8}>
      <Caps
        rounded={'lg'}
        overflow={'hidden'}
        w={'full'}
        shadow={'md'}
        imageParams={capsParams}
      />
      <Stack fontSize={'lg'} justify={'center'} spacing={6}>
        <Heading as={'h3'}>{hashtag.title}</Heading>
        <Text>{t('support.hashtag')}</Text>
        <Navigate href={link} fontWeight={'bold'} color={'primary.500'}>
          {t('join-link')}
        </Navigate>
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
