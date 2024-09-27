import { FC } from 'react'

import { Link } from '@chakra-ui/next-js'
import { Heading, Stack, Text } from '@chakra-ui/react'
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
    <Stack spacing={8}>
      <Caps
        rounded={'lg'}
        overflow={'hidden'}
        w={'full'}
        shadow={'md'}
        imageParams={capsParams}
        hideLogo={true}
      />
      <Stack fontSize={'lg'} justify={'center'} spacing={6}>
        <Heading as={'h3'}>{hashtag.title}</Heading>
        <Text>{t('support.hashtag')}</Text>
        <Link href={link} fontWeight={'bold'} color={'primary.500'}>
          {t('join-link')}
        </Link>
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
