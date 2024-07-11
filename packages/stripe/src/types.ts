export type MetaDataType = 'course' | 'donate'

// for error checking
export type StripeMetaData = {
  strapi_id: number
  type: MetaDataType
}
