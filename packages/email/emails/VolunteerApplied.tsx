import React, { FC } from 'react'

import { Column, Row, Section } from '@react-email/components'

import { Profile } from '@fc/types'

import SiteLayout from './components/SiteLayout'
import { EmailProvider } from './EmailProvider'

type VolunteerAppliedProps = {
  volunteer: Profile
}

const VolunteerApplied: FC<VolunteerAppliedProps> = ({ volunteer }) => {
  const {
    name = '...',
    email,
    phone = '...',
    availableHours = '...',
    city = '...',
    age = '...',
    jobs,
    occupation = '...',
  } = volunteer

  return (
    <EmailProvider>
      <SiteLayout site="foundation" preview={`New Volunteer: ${name}`}>
        <Section className="w-max">
          <Row>
            <Column className="w-32">Name</Column>
            <Column>{name}</Column>
          </Row>
          <Row>
            <Column className="w-32">Email</Column>
            <Column>{email}</Column>
          </Row>
          <Row>
            <Column className="w-32">Age</Column>
            <Column>{age}</Column>
          </Row>
          <Row>
            <Column className="w-32">City</Column>
            <Column>{city}</Column>
          </Row>
          <Row>
            <Column className="w-32">Phone</Column>
            <Column>{phone}</Column>
          </Row>
          <Row>
            <Column className="w-32">Hours</Column>
            <Column>{availableHours}</Column>
          </Row>
          <Row>
            <Column className="w-32">Occupation</Column>
            <Column>{occupation}</Column>
          </Row>
          <Row>
            <Column className="w-32 align-top">Jobs</Column>
            <Column>
              {jobs?.map(job => (
                <Section key={job.name_en}>
                  {job.name_en} ({job.platform?.name_en})
                </Section>
              ))}
            </Column>
          </Row>
        </Section>
      </SiteLayout>
    </EmailProvider>
  )
}

export default VolunteerApplied
