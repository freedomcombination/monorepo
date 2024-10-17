import React, { FC } from 'react'

import { Row, Text } from '@react-email/components'

import type { Profile } from '@fc/types'
import { getTranslate, TranslateFunc } from '../../utils/getTranslate'
import { EmailProvider } from './../../EmailProvider'

type VolunteerAppliedProps = {
  volunteer?: Profile
  t: TranslateFunc
}

const VolunteerApplied: FC<VolunteerAppliedProps> = ({
  volunteer = {
    name: 'User name',
    platforms: [
      {
        id: 1,
        name_en: 'platform name',
        name_nl: 'platform name',
        name_tr: 'platform name',
      },
      {
        id: 2,
        name_en: 'platform name',
        name_nl: 'platform name',
        name_tr: 'platform name',
      },
    ],
  },
  t = getTranslate('en').t,
}) => {
  const locale = t()

  return (
    <EmailProvider
      site="foundation"
      preview={t('volunteer-applied.preview', { name: volunteer.name })}
      heading={t('volunteer-applied.header', { name: volunteer.name })}
    >
      {volunteer.platforms?.length > 0 && (
        <Row>
          {volunteer.platforms.map(platform => (
            <Text key={platform.id}>{platform['name_' + locale]}</Text>
          ))}
        </Row>
      )}
    </EmailProvider>
  )
}

export default VolunteerApplied
