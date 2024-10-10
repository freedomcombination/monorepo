import { BlocksContent } from '@strapi/blocks-react-renderer'

import { Asset } from './asset'
import { Contact } from './contact'
import { UploadFile } from './file'
import { Platform } from './platform'
import { Profile } from './profile'
import { StrapiBase } from './strapi'

type FoundationBase = {
  email: string
  name: string
  chairman: string
  secretary: string
  accountant: string
  contact?: Contact | null
  bank1?: string | null
  bank2?: string | null
  IBAN1?: string | null
  IBAN2?: string | null
  KVK: string
  BIC: string
  RSIN: string
  about_en: BlocksContent | null
  about_nl: BlocksContent | null
  about_tr: BlocksContent | null
}

type FoundationRelation = {
  volunteers?: Profile[]
  platforms?: Platform[]
  assets?: Asset[]
  policy_plan?: UploadFile | null
  substantive_financial_annual_report?: UploadFile | null
  remuneration_policy?: UploadFile | null
}

type FoundationRelationInput = {
  volunteers?: Array<number>
  platforms?: Array<number>
  assets?: Array<number>
}

export type FoundationCreateInput = Partial<FoundationBase> &
  FoundationRelationInput

export type FoundationUpdateInput = Partial<FoundationBase> &
  FoundationRelationInput

export type Foundation = StrapiBase & FoundationBase & FoundationRelation
