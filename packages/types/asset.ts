import { UploadFile } from './file'
import { Platform } from './platform'
import { Profile } from './profile'
import { StrapiBase } from './strapi'

type AssetBase = {
  name: string
  sku: string
  price: number
  location: string
  rules: string
  notes: string
}

type AssetRelation = {
  images?: UploadFile[]
  invoice?: UploadFile | null
  platform?: Platform | null
  peopleInCharge?: Profile[]
}

type AssetRelationInput = {
  images?: Array<number>
  invoice?: number
  platform?: number
  peopleInCharge?: Array<number>
}

export type AssetCreateInput = Partial<AssetBase> & AssetRelationInput

export type AssetUpdateInput = Partial<AssetBase> & AssetRelationInput

export type Asset = StrapiBase & AssetBase & AssetRelation
