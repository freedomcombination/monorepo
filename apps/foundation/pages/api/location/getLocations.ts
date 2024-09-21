const apiKey = 'b58cd4b896234ea98584def67e928cec'

export const getLocations = async () => {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=Amsterdam&format=json&apiKey=${apiKey}`,
    ) // Correct API URL with apiKey as a query parameter

    if (!response.ok) {
      throw new Error('Network response was not ok') // Handle network errors
    }

    const data = await response.json()

    if (!data) {
      throw new Error('No data received from API')
    }

    console.log('locations data', data)

    return data
  } catch (error) {
    console.log('Error fetching location data: ', error)
  }
}
