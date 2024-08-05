import React, { FC } from 'react'

import { Stack } from '@chakra-ui/react'

import { useStrapiRequest } from '@fc/services'
import { Observation, Profile } from '@fc/types'

import { ObservationList } from '../ObservationList'
import { ProfileContact } from '../ProfileContact'

type ProfileFormsProps = {
  profile: Profile
}

export const ProfileForms: FC<ProfileFormsProps> = ({ profile }) => {
  const observationRequest = useStrapiRequest<Observation>({
    endpoint: 'observations',
    filters: { profile: { id: { $eq: profile.id } } },
    sort: ['createdAt:desc'],
  })

  const observations = observationRequest.data?.data ?? []

  return (
    <Stack divideColor={'gray.400'}>
      <ProfileContact
        profile={profile}
        onSuccess={observationRequest.refetch}
      />
      <ObservationList
        observations={observations}
        onSuccess={observationRequest.refetch}
        id={profile.id}
      />
    </Stack>
  )
}
