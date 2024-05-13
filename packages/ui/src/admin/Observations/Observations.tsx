import { Stack, Text, Box } from '@chakra-ui/react'

import { useStrapiRequest } from '@fc/services'
import { StrapiCollectionEndpoint, StrapiModel } from '@fc/types'
import { Observation } from '@fc/types/src/observation'

import { ObservationItem } from './ObservationItem'
export type ObservationsProps = {
  endpoint: StrapiCollectionEndpoint
  name: string
  id: number
}
export const Observations = ({ endpoint, name, id }: ObservationsProps) => {
  // const { t } = useTranslation()

  const observationRequest = useStrapiRequest<Observation>({
    endpoint: 'observations',
    filters: { profile: { id: { $eq: id } } },
    sort: ['createdDate:desc'],
  })

  const observations = observationRequest.data?.data ?? []

  return (
    <Stack>
      <Text fontWeight={600}>{name}</Text>
      <Box borderWidth="1px">
        {observations?.map(observation => {
          return (
            <ObservationItem
              content={observation?.content}
              createdDate={observation?.createdDate}
              creator={observation?.creator || []}
              key={observation?.id}
            />
          )
        })}
      </Box>
    </Stack>
  )
}
