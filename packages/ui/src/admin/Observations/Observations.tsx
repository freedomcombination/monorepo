import { Stack, Text, Box } from '@chakra-ui/react'

import { useStrapiRequest } from '@fc/services'
import { Observation } from '@fc/types/src/observation'

import { ObservationItem } from './ObservationItem'
export type ObservationsProps = {
  name: string
  id: number
}
export const Observations = ({ name, id }: ObservationsProps) => {
  // const { t } = useTranslation()

  const observationRequest = useStrapiRequest<Observation>({
    endpoint: 'observations',
    filters: { profile: { id: { $eq: id } } },
    sort: ['createdAt:desc'],
  })

  const observations = observationRequest.data?.data ?? []

  return (
    <Stack>
      <Text fontWeight={600}>{name[0].toUpperCase() + name.slice(1)}</Text>
      <Box>
        {observations?.map(observation => {
          return (
            <ObservationItem
              content={observation?.content}
              createdAt={observation?.createdAt}
              creator={observation?.creator || []}
              key={observation?.id}
            />
          )
        })}
      </Box>
    </Stack>
  )
}
