import React, { FC } from 'react'

import { Heading, Preview, Section, Text } from '@react-email/components'

import { Profile } from '@fc/types'
import { EmailProvider } from './EmailProvider'

type VolunteerAppliedProps = {
  volunteer: Profile
}

const VolunteerApplied: FC<VolunteerAppliedProps> = ({ volunteer }) => {
  return (
    <EmailProvider>
      <Preview>New volunteer application from {volunteer.name}</Preview>
      <Section>
        <Text>
          <Heading>New volunteer application</Heading>
          <Text>{volunteer.name} has applied to be a volunteer</Text>
          {volunteer.platforms?.length > 0 && (
            <Section>
              {volunteer.platforms.map(platform => (
                <Text key={platform.id}>{platform.name_en}</Text>
              ))}
            </Section>
          )}
        </Text>
      </Section>
    </EmailProvider>
  )
}

export default VolunteerApplied
