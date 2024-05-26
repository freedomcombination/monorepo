import { Heading, Stack } from '@chakra-ui/react'

import { useStrapiRequest } from '@fc/services'
import { Observation } from '@fc/types/src/observation'

import { ObservationCreateForm } from '../ObservationCreateForm'
import { ObservationEditForm } from '../ObservationEditForm'

export type ObservationListProps = {
  id: number
}
export const ObservationList = ({ id }: ObservationListProps) => {
  const observationRequest = useStrapiRequest<Observation>({
    endpoint: 'observations',
    filters: { profile: { id: { $eq: id } } },
    sort: ['createdAt:desc'],
  })

  const observations = observationRequest.data?.data ?? []

  return (
    <Stack p={{ base: 4, lg: 8 }} spacing={4}>
      <Heading as="h2">Observations</Heading>
      <ObservationCreateForm
        profileId={id}
        onSuccess={observationRequest.refetch}
      />
      <Stack>
        {observations?.map(observation => {
          return (
            <ObservationEditForm
              id={observation?.id}
              content={observation?.content}
              createdAt={observation?.createdAt}
              creator={observation?.creator || []}
              key={observation?.id}
              onSuccess={observationRequest.refetch}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}
