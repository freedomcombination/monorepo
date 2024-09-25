import { StrapiBase } from './strapi'

export type LocationType = 'country' | 'state' | 'city'

export type Location = StrapiBase & {
  name: string
  slug: string
  countryCode: string | null
  type: LocationType
  lat: number
  lon: number
  state?: Location | null
  country?: Location | null
}
