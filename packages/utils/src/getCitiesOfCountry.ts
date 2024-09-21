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

    if (!response.ok) {
      throw new Error('Failed to fetch cities data')
    }

    const data = await response.json()
    const cityOptions = data.data.map((city: string) => ({
      value: city,
      label: city,
    }))

    return cityOptions
  } catch (error) {
    throw new Error(`Failed to fetch cities data: ${error}`)
  }
}
