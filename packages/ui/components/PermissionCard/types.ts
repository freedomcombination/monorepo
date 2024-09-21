import type { EndpointControllers, Permissions } from '@fc/types'

export type ViewEndpointProps = {
  endpoint: string
  controllers: EndpointControllers
  onChange: (endpoint: string, values: EndpointControllers) => void
  readonly?: boolean
}

export type ActionApiProps = {
  action: string
  value: boolean
  onChange: (value: boolean) => void
  readonly: boolean
  blocked: boolean
}

export type PermissionCardProps = {
  permission: Permissions
  filters?: string[]
  onChange?: (permission: Permissions) => void
  editable?: boolean
}
