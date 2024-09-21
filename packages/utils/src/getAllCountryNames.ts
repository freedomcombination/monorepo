export const getAllCountryNames = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')
    if (!response.ok) {
      throw new Error('Failed to fetch countries data')
    }

    const countriesData = await response.json()

    if (!Array.isArray(countriesData)) {
      throw new Error(
        'Failed to fetch countries data: countriesData is not an array',
      )
    }

    const countries = countriesData
      .map((country: any) => {
        if (!country || !country.name || !country.name.common) {
          throw new Error(
            'Failed to fetch countries data: country or country.name.common is null',
          )
        }

        return {
          value: country.name.common,
          label: country.name.common,
        }
      })
      .sort((a, b) => a.label.localeCompare(b.label))

    return countries
  } catch (error) {
    throw new Error(`Failed to fetch countries data: ${error}`)
  }
}
