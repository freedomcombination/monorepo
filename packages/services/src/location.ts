import { useQuery } from '@tanstack/react-query'

import { LocationType } from '@fc/types'

export const searchLocation = async (text: string, type: LocationType) => {
  const params = new URLSearchParams()
  params.append('text', text)
  params.append('type', type)

  const response = await fetch(`/api/locations?${params.toString()}`)

  return response.json()
}

export const useSearchLocation = (text: string, type: LocationType) => {
  return useQuery({
    queryKey: ['locations', text, type],
    queryFn: () => searchLocation(text, type),
  })
}
