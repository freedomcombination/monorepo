export type MetaDataType = 'course' | 'donation'

// for error checking
export type StripeMetaData = {
  strapi_id: number
  type: MetaDataType
  token?: string
}
