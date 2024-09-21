export const fetchCountryCodes = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    return data.map((country: any) => ({
      value: `+${country.idd.root?.replace('+', '')}${country.idd.suffixes?.[0] || ''}`,
      label: country.name.common,
      flag: country.flags.png,
    }))
  } catch (error) {
    console.error('Error fetching country codes:', error)

    return [] // Return an empty array if there's an error
  }
}
