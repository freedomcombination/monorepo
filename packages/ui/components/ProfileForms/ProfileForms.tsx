import React, { FC } from 'react'

import { Separator, Stack } from '@chakra-ui/react'

import { useStrapiRequest } from '@fc/services/common/request'
import type { Observation, Profile } from '@fc/types'

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
    <Stack separator={<Separator />}>
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
