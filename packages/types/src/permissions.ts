export type SimpleRole = {
  id: number
  name: string
  description: string
  nb_users: number
  permissions: SimpleEndpoint
}

export type SimpleApi = {
  [key: string]: boolean
} & {
  backup?: {
    [key: string]: boolean
  }
}

export type SimpleEndpoint = {
  [key: string]: SimpleApi
}

export type StrapiApiStatus = {
  enabled: boolean
  policy: string
}

export type StrapiControlApi = {
  [key: string]: StrapiApiStatus
}

export type StrapiController = {
  [key: string]: StrapiControlApi
}

export type StrapiPermission = {
  [key: string]: {
    controllers: StrapiController
  }
}
