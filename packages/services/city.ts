import { useQuery } from '@tanstack/react-query'

export const getCitiesOfCountry = async (country: string) => {
  try {
    const response = await fetch(
      'https://countriesnow.space/api/v0.1/countries/cities',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country }),
      },
    )

    const data = await response.json()

    const cityOptions = data.data?.map((city: string) => ({
      value: city,
      label: city,
    }))

    return cityOptions as { value: string; label: string }[]
  } catch (error) {
    console.error('Failed to fetch cities data:', error)

    throw error
  }
}

export const useCitiesOfCountry = (country?: string) => {
  return useQuery({
    queryKey: ['cities', country],
    queryFn: () => (country ? getCitiesOfCountry(country) : []),
    enabled: !!country,
  })
}
