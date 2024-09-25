// https://api.geoapify.com/v1/geocode/search?text=Waldkirchen&lang=en&limit=5&type=city&filter=countrycode:de&bias=proximity:13.1934588,48.633274&format=json&apiKey=d548c5ed24604be6a9dd0d989631f783
import { NextRequest } from 'next/server'
import { DeepPartial } from 'react-hook-form'

import { getSecret } from '@fc/secrets'
import { GeoLocationSearch, LocationType } from '@fc/types'

export const searchLocationHandler = async (request: NextRequest) => {
  const text = request.nextUrl.searchParams.get('text')
  const type = request.nextUrl.searchParams.get('type') as LocationType

  if (!text || !type) {
    return Response.json({ code: 400, message: 'Bad Request' })
  }

  const params = new URLSearchParams()
  params.append('text', text)
  // TODO: Add secret
  params.append('apiKey', getSecret('GEOLOCATION_API_KEY'))
  const url = 'https://api.geoapify.com/v1/geocode/search?' + params.toString()

  const response = await fetch(url)

  const data = (await response.json()) as GeoLocationSearch

  const result = data.features
    .map(feature => {
      const featureType: LocationType = feature.properties.city
        ? 'city'
        : feature.properties.state
          ? 'state'
          : 'country'

      return {
        name:
          feature.type === type
            ? feature.properties[featureType]
            : feature.properties.name || feature.properties[featureType],
        countryCode: feature.properties.country_code,
        lat: feature.properties.lat,
        lon: feature.properties.lon,
        city: { name: feature.properties.city },
        state: { name: feature.properties.state },
        country: { name: feature.properties.country },
        type: featureType,
        bounds: `${feature.bbox[0]},${feature.bbox[1]} - ${feature.bbox[2]},${feature.bbox[3]}`,
        place_id: feature.properties.place_id,
      }
    })
    .filter(location => location.name) as Array<
    DeepPartial<Location & { city: { name: string }; place_id: string }>
  >

  return Response.json(result)
}
