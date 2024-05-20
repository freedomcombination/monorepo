import React, { FC } from 'react'

import {
  Body,
  Container,
  Heading,
  Preview,
  Section,
  Text,
} from '@react-email/components'

import { TailwindThemeProvider } from './TailwindThemeProvider'
import { Profile } from '@fc/types'

type VolunteerAppliedProps = {
  volunteer: Profile
}

const VolunteerApplied: FC<VolunteerAppliedProps> = ({ volunteer }) => {
  return (
    <TailwindThemeProvider>
      <Preview>New volunteer application from {volunteer.name}</Preview>
      <Body>
        <Container>
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
        </Container>
      </Body>
    </TailwindThemeProvider>
  )
}

export default VolunteerApplied
